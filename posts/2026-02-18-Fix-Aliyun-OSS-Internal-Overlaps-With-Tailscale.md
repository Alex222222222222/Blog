---
title: "Fix: Aliyun OSS Internal IP Overlaps with Tailscale CGNAT and Breaks Access (Debian)"
date: "2026-02-18"
tags: ["aliyun", "tailscale"]
toc: true
categories: ["CS"]
---

# Fix: Aliyun OSS Internal IP Overlaps with Tailscale CGNAT and Breaks Access (Debian)

## Problem

Tailscale assigns node IPv4 addresses from the CGNAT range `100.64.0.0/10` (RFC 6598).  
Aliyun OSS internal endpoints can also resolve to IPs within this same range.

For example, according to
[Aliyun official documentation](https://help.aliyun.com/zh/oss/user-guide/regions-and-endpoints?spm=a2c4g.11186623.0.0.61501664sXwo74),
the Hong Kong OSS internal endpoint `oss-cn-hongkong-internal.aliyuncs.com`
may resolve to addresses in:

- `100.115.61.0/24`
- `100.99.103.0/24`
- `100.99.104.0/24`
- `100.99.106.0/24`

I first noticed the issue when OSS access via the internal endpoint failed on an Aliyun ECS instance.  
I also saw similar failures when accessing the Aliyun internal Debian package mirror.

Switching Debian mirror traffic to a public mirror is a workable workaround.  
However, switching OSS traffic to the public endpoint is not ideal because it can increase costs:
internal OSS traffic is free, while public endpoint traffic is billed.

Packet-level testing showed that traffic to these `/24` ranges left via the Aliyun internal interface,
and replies arrived at the interface, but applications still timed out (for example, `ping`).

## Root cause

From [Tailscale documentation](https://tailscale.com/docs/reference/netfilter-modes):
when `netfilter-mode` is enabled, Tailscale installs iptables rules to prevent CGNAT spoofing:

> Traffic from `100.64.0.0/10` that does not arrive through `tailscale0` is dropped.

In practice, the `ts-input` chain includes a rule like:

- `-A ts-input -s 100.64.0.0/10 ! -i tailscale0 -j DROP`

So replies from OSS hosts (for example, `100.115.61.1`) that arrive on `ens5` (or another non-`tailscale0` interface) are dropped before they reach user-space applications—even though packet capture confirms the replies are arriving.

## Solution

Add a **narrow allowlist exception** for the specific OSS `/24` ranges **before** Tailscale’s CGNAT anti-spoof DROP rule.

The simplest approach is to insert `RETURN` rules into `ts-input`:

- match packets with source IPs in the specific OSS `/24` ranges
- only when they arrive on interfaces other than `tailscale0`

This keeps Tailscale’s anti-spoof protection for the rest of `100.64.0.0/10`, while allowing known legitimate ranges on your LAN/VPC path.

Disabling netfilter integration entirely also fixes the problem, but weakens protection more broadly.  
A targeted allowlist is the safer compromise.

## One-time manual fix (immediate)

Insert exceptions into `ts-input` before the CGNAT DROP rule:

```bash
sudo iptables -I ts-input 3 -s 100.115.61.0/24 ! -i tailscale0 -j RETURN
sudo iptables -I ts-input 3 -s 100.99.103.0/24 ! -i tailscale0 -j RETURN
sudo iptables -I ts-input 3 -s 100.99.104.0/24 ! -i tailscale0 -j RETURN
sudo iptables -I ts-input 3 -s 100.99.106.0/24 ! -i tailscale0 -j RETURN
```

Verify rule order:

```bash
sudo iptables -S ts-input
```

Verify connectivity:

```bash
ping -c 3 100.115.61.1
```

## Persistence on Debian (recommended): systemd oneshot

Tailscale may recreate or rewrite `ts-*` iptables chains during restart or upgrade.  
For reliability, re-apply the allowlist after `tailscaled` starts.

### Script

Create:

`/usr/local/sbin/tailscale-cgnat-allow-corp.sh`

```sh
#!/bin/sh
set -eu

# OSS/internal CGNAT subnets that must be allowed on non-tailscale interfaces
SUBNETS="
100.115.61.0/24
100.99.103.0/24
100.99.104.0/24
100.99.106.0/24
"

# Wait briefly for tailscaled to install ts-input chain (avoid boot race)
for i in 1 2 3 4 5; do
  if iptables -S ts-input >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

# Insert RETURN rules near the top of ts-input, before the CGNAT DROP.
# Use -C first to keep it idempotent (safe to run repeatedly).
for net in $SUBNETS; do
  if ! iptables -C ts-input -s "$net" \! -i tailscale0 -j RETURN 2>/dev/null; then
    iptables -I ts-input 3 -s "$net" \! -i tailscale0 -j RETURN
  fi
done
```

Make it executable:

```bash
sudo chmod 0755 /usr/local/sbin/tailscale-cgnat-allow-corp.sh
```

### systemd unit

Create:

`/etc/systemd/system/tailscale-cgnat-allow-corp.service`

```ini
[Unit]
Description=Allow selected CGNAT subnets outside tailscale0 (Tailscale anti-spoof override)
After=tailscaled.service network-online.target
Wants=tailscaled.service network-online.target

[Service]
Type=oneshot
ExecStart=/usr/local/sbin/tailscale-cgnat-allow-corp.sh

[Install]
WantedBy=multi-user.target
```

Enable and run:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now tailscale-cgnat-allow-corp.service
```

### Verify persistence across Tailscale restart

```bash
sudo systemctl restart tailscaled
sudo iptables -S ts-input | sed -n '1,30p'
ping -c 3 100.115.61.1
```
