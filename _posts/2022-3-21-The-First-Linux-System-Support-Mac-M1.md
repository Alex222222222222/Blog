---
layout: posts
title: The First Linux System Support Mac M1
author: Zifan Hua
tags:
- Computer Science
- News
categories: News
---

### The first Asahi Linux Alpha Release is here!

[Asahi Linux](https://asahilinux.org/2022/03/asahi-linux-alpha-release/)

![Asahi Linux]({{ site.baseurl }}/assets/images/2022-03-21-Asahi-Linux.jpg)

首个支持苹果 M1 / Pro / Max Mac 的 Linux 发行版发布，面向所有用户开放下载
https://asahilinux.org/2022/03/asahi-linux-alpha-release/

#### What works

All M1, M1 Pro, and M1 Max devices are supported except for the Mac Studio.

- Wi-Fi
- USB2 (Thunderbolt ports)
- USB3 (Mac Mini Type A ports)
- Screen (no GPU)
- NVMe
- Lid switch
- Power button
- Built-in display (framebuffer only)
- Built-in keyboard/touchpad
- Display backlight on/off
- Battery information / charge control
- RTC
- Ethernet (desktops)
- SD card reader (M1 Pro/Max)
- CPU frequency switching

M1 machines only (no Pro/Max):
- Headphones jack (might be flaky)

Mac Mini only:
- HDMI output

Not yet, but coming soon:

- USB3
- Speakers
- Display controller (backlight brightness control, V-Sync, proper DPMS)

#### What doesn’t

Everything else, but notably:
- DisplayPort
- Thunderbolt
- HDMI on the MacBooks
- Bluetooth
- GPU acceleration
- Video codec acceleration
- Neural Engine
- CPU deep idle
- Sleep mode
- Camera
- Touch Bar
Note: on the 13" MacBook Pro, you can use Fn + the number row keys (1-9, 0, and the next two) as F1..F12 in lieu of the Touch Bar.

#### Known bugs

If Wi-Fi doesn't work, try toggling it off and on in the network management menu
If the headphones jack doesn't work or only one channel works, try rebooting. There's a flakiness issue.

