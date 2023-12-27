{
  description = "Alex222222222222 configuration for arm64 nix os";

  nixConfig = {
    experimental-features = [ "nix-command" "flakes" ];
    substituters = [
      "https://cache.nixos.org/"
      "https://mirrors.bfsu.edu.cn/nix-channels/store"
    ];

    # nix community's cache server
    extra-substituters =
      [ "https://nix-community.cachix.org" "https://hyprland.cachix.org" ];
    extra-trusted-public-keys = [
      "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
      "hyprland.cachix.org-1:a7pgxzMz7+chwVL3/pzj6jIBMioiJM7ypFP8PwtkuGc="
    ];
  };

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, ... }@inputs: {
    devShells = let
      # System types to support.
      supportedSystems =
        [ "x86_64-linux" "x86_64-darwin" "aarch64-linux" "aarch64-darwin" ];
      # Helper function to generate an attrset '{ x86_64-linux = f "x86_64-linux"; ... }'.
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
    in forAllSystems (system:
      let
        inherit (pkgs.stdenv) isLinux;
        pkgs = import nixpkgs {
          system = system;
          config.allowUnfree = true;
        };

        buildInputs = [
          pkgs.unzip
          pkgs.git
          pkgs.curl
          pkgs.wget
          pkgs.neovim
          pkgs.nixfmt
          pkgs.sqlite
          pkgs.tokei
          pkgs.mosh
          pkgs.gimp
          pkgs.vscode
          pkgs.nil
          pkgs.nixfmt
          pkgs.nodejs_20
          pkgs.nodePackages.npm
        ];
        shellHook = ''
          export EDITOR=nvim
          export VISUAL=nvim
          export PATH=$PATH:$HOME/.local/bin
        '';
      in {
        default = pkgs.mkShell {
          buildInputs = buildInputs;
          shellHook = shellHook;
        };
      });

    formatter.x86_64-linux = nixpkgs.legacyPackages.x86_64-linux.nixpkgs-fmt;
    formatter.aarch64-darwin =
      nixpkgs.legacyPackages.aarch64-darwin.nixpkgs-fmt;
  };
}

