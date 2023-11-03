---
title: NixOS Configurations | NixOS 不完全手记
date: "2023-06-05"
tags: ["Linux", "NixOS", "Nix", "System", "OpenSource"]
toc: true
categories: ["NixOS"]
---

## Intro

Some note for NixOS configurations.

## Useful Commands

### Rebuild the System

Need `sudo`.

```bash
# test the configuration
sudo nixos-rebuild test --flake "/path/to/config#tag" --show-trace

# switch to the configuration
sudo nixos-rebuild switch --flake "/path/to/config#tag" --show-trace
```

## Useful Websites

[NixOS Full Options List](https://nixos.org/manual/nixos/stable/options.html#opt-environment.etc)

[NixOS Package List](https://search.nixos.org)

[GitHub User Public Key](https://github.com/Alex222222222222.keys)

## Put File Under /etc

Check [ ](https://nixos.org/manual/nixos/stable/options.html#opt-environment.etc)

```nix
{
    example-configuration-file =
    { 
        source = "./file.conf.example";
        mode = "0440";
    };
    "default/useradd".text = "GROUP=100 ...";
}
```

## Reference Store Path of a Nix Package

```nix
''
${pkgs.hello}/bin/hello
''
```

## Use Agenix to Manage Secrets

Check [`agenix GitHub`](https://github.com/ryantm/agenix#age-module-reference).

### Install Agenix Via Flakes

```nix
{
  inputs.agenix.url = "github:ryantm/agenix";
  # optional, not necessary for the module
  #inputs.agenix.inputs.nixpkgs.follows = "nixpkgs";
  # optionally choose not to download darwin deps (saves some resources on Linux)
  #inputs.agenix.inputs.darwin.follows = "";

  outputs = { self, nixpkgs, agenix }: {
    # change `yourhostname` to your actual hostname
    nixosConfigurations.yourhostname = nixpkgs.lib.nixosSystem {
      # change to your system:
      system = "x86_64-linux";
      modules = [
        ./configuration.nix
        agenix.nixosModules.default
      ];
    };
  };
}
```

### Get Secrets

`agenix` use `ssh keys` as keys.

System host `ssh key` is at `/etc/ssh/`.

User's `ssh key` is at `~/.ssh`.

### Mkdir For Agenix

```bash
mkdir -p ./secrets
```

### Add Secrets Keys

Keys should be put at `./secrets/secrets.nix`.

```nix
# ./secrets/secrets.nix
let
  user1 = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIL0idNvgGiucWgup/mP78zyC23uFjYq0evcWdjGQUaBH";
  user2 = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILI6jSq53F/3hEmSs+oq9L4TwOo1PrDMAgcA1uo1CCV/";
  users = [ user1 user2 ];

  system1 = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPJDyIr/FSz1cJdcoW69R+NrWzwGK/+3gJpqD1t8L2zE";
  system2 = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKzxQgondgEYcLpcPdJLrTdNgZ2gznOHCAxMdaceTUT1";
  systems = [ system1 system2 ];
in
{
  "secret1.age".publicKeys = [ user1 system1 ];
  "secret2.age".publicKeys = users ++ systems;
}
```

This file declare that the `secret1.age` can be decrypted by `user1` and `system1`.
`secret2.age` can be decrypted by all users in `users` and `systems`.

### Add Secrets

```bash
# You need to be in the same directory as secrets.nix
cd ./secrets

# This will open your editor ($EDITOR) to create the secret
agenix -e secret1.age
```

### Add Secrets to NixOS Configurations

```nix
{
  # this will allow you to use the secrets in your NixOS configuration as a string
  age.secrets.secret1.file = ../secrets/secret1.age;
}
```

Or,

```nix
{
  # this will allow you to access the at the path /etc/secret1 with the correct permissions
  age.secrets.secret1 = {
    file = ../secrets/secret1
    path = "/etc/secret1";;
    mode = "770";
    owner = "nginx";
    group = "nginx";
  };
}
```

### Use Secrets

#### Use Path of Secrets

```nix
{
  users.users.user1 = {
    isNormalUser = true;
    passwordFile = config.age.secrets.secret1.path;
  };
}
```

#### Replace Inplace Strings With Secrets

Considering that there still might be some modules which doesn't support reading secrets from a file, you could provide a placeholder string instead of a clear-text password and replace this placeholder with the secret provided by Agenix.

In the following example, the Dex module creates the config file /run/dex/config.yaml containing the placeholder string @dex-user-password@. The activation script will read the Agenix secret from config.age.secret.dex-user-password.path and replace the placeholder string with the actual secret.

```nix
system.activationScripts."dex-user-secret" = ''
  secret=$(cat "${config.age.secrets.dex-user-password.path}")
  configFile=/run/dex/config.yaml
  ${pkgs.gnused}/bin/sed -i "s#@dex-user-password@#$secret#" "$configFile"
'';
```

## Mount WebDav Using AutoFS

I found this two links really helpful.

[https://askubuntu.com/questions/821123/autofs-and-webdav-how-to-make-them-work-together](https://askubuntu.com/questions/821123/autofs-and-webdav-how-to-make-them-work-together)

[https://www.reddit.com/r/NixOS/comments/b5p6f7/how_do_i_use_davfs2/](https://www.reddit.com/r/NixOS/comments/b5p6f7/how_do_i_use_davfs2/)

First you need to install [`agenix`](#use-agenix-to-manage-secrets) as a way to manage your `WebDav` secrets.

Then you need to add the following to your `configuration.nix`.
This will mount your `WebDav` to `/mnt/{{ mount-dir }}`.

```nix
{
  age.secrets = {
    webdav-secrets = {
      file = ./secrets/{{ your secret file }};
      owner = "root";
      group = "root";
      mode = "600";
      # this is the path where the secret will be mounted
      path = "/etc/davfs2/secrets";
    };
  };

  # put the configuration for davfs2 in the /etc/davfs2 directory
  environment.etc."davfs2/auto.mount" = {
    # rw means read-write, ro means read-only
    # you need to add backslash `\` before ':' and '#' in your url
    text = ''
      {{ mount-dir }} -fstype=davfs,conf=/etc/davfs2/conf,rw {{ your webdav url }}
    '';
    mode = "0440";
  };
  environment.etc."davfs2/conf" = {
    text = ''
      secrets /etc/davfs2/secrets
    '';
    mode = "0440";
  };

  # enable the service
  services.davfs2.enable = true;
  services.autofs = {
    enable = true;
    autoMaster = "/mnt/ /etc/davfs2/auto.mount";
  };
}
```

## Clean the System & Nix Store

```nix
# clean journalctl
services.cron = {
  enable = true;
  systemCronJobs = [
    "0 0 * * * journalctl --vacuum-time=7d 1>/dev/null"
  ];
};

# garbange collection check https://nixos.wiki/wiki/Nix_Cookbook#Reclaim_space_on_Nix_install.3F
nix.gc.automatic = true;
nix.settings.auto-optimise-store = true;
```

## Enable the Mosh Server

```nix
# Enable mosh, the ssh alternative when client has bad connection
# Opens UDP ports 60000 ... 61000
programs.mosh.enable = true;
networking.firewall.allowedTCPPortRanges = [
  {
    from = 60000;
    to = 61000;
  }
];
networking.firewall.allowedUDPPortRanges = [
  {
    from = 60000;
    to = 61000;
  }
];
```

## Enable Fail2Ban

```nix
services.fail2ban = {
  enable = true;
  maxretry = 5;
  ignoreIP = [
    "127.0.0.0/8" 
    "10.0.0.0/8" 
    "172.16.0.0/12" 
    "192.168.0.0/16"
    "8.8.8.8"
  ];
};
```