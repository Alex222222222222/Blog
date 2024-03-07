---
title: "Running Witcher 3 on MacOS"
date: "2024-03-07"
tags: ["Tutorial", "MacOS", "Gaming", "Wine", "Steam"]
toc: true
categories: ["Tutorial"]
description: "How to run Witcher 3 on MacOS"
---

## Introduction

For long, MacOS users have been left out of the gaming world.
But with the advent of
[Wine](https://en.wikipedia.org/wiki/Wine_(software)),
it's now possible to run Windows games on MacOS.
In this tutorial, I'll show you how to run Witcher 3 on MacOS using
[Whisky](https://github.com/Whisky-App/Whisky)
\- a modern Wine wrapper built for MacOS.

All software used in this tutorial is free and open-source
except for Steam and Witcher 3, which are proprietary.

## Prerequisites

### Steam Account

You'll need to have a Steam account and have already purchased Witcher 3.

### System Requirements

You'will have to have Rosetta 2 installed on your system.

From [Apple's Official Documentation](https://support.apple.com/en-gb/102527):

> Open any app that needs Rosetta. If the app opens, Rosetta is already installed and working.
> If Rosetta is not installed, you’ll be automatically asked to install it.

I am using MacOS Sonoma 14.2 on a MacBook Pro (M1, 2021).
I do not ensure that this method will work on other systems.

### Download Necessary Files

#### Download Whisky

Download the latest version of Whisky from the official
[GitHub Releases Page](https://github.com/Whisky-App/Whisky/releases).
Just use the latest version available.

Download the `.zip` file or `.dmg` file as I highlighted in the image below.

![Whisky](/static/img/2024-03-07-Run-Witcher3-On-MacOS/1.png)

#### Download Steam Installer for Windows

Download the Steam installer for **Windows** from the official
[Steam Website](https://store.steampowered.com/about/).

**Important**: What you need is the Windows installer, not the MacOS installer.
The file should be named something like `SteamSetup.exe`.

To download it, you'll need to visit the [Official Steam Website](https://store.steampowered.com/about/) and click on the **Windows Icon** below the "INSTALL STEAM" button as I highlighted in the image below.

![Steam](/static/img/2024-03-07-Run-Witcher3-On-MacOS/2.png)

## Installation

### Install Whisky

Open the `.zip` or `.dmg` file you downloaded on [Download Whisky step](#download-whisky) and drag the Whisky app to your Applications folder. Or just leave it anywhere on your computer if you prefer.

### Install Necessary Dependencies for Whisky

Open Whisky app, and it will ask you to install GPTK. Click on "Next" and wait for the installation to finish.

![Whisky](/static/img/2024-03-07-Run-Witcher3-On-MacOS/3.png)

### Create a New Bottle

Create a new bottle by clicking on the "+" button on the right top corner of the Whisky app.

![Whisky](/static/img/2024-03-07-Run-Witcher3-On-MacOS/4.png)

Just put arbitrary bottle name and leave all other settings as default and click "Create". You will need to wait some time for the bottle to be created.

![Whisky](/static/img/2024-03-07-Run-Witcher3-On-MacOS/5.png)

### Install Steam

On the right bottom corner of the Whisky app, click on the "Run..." button.

![Whisky](/static/img/2024-03-07-Run-Witcher3-On-MacOS/6.png)

Select the Steam installer you downloaded on [Download Steam Installer for Windows step](#download-steam-installer-for-windows). And then click "Open".

![Whisky](/static/img/2024-03-07-Run-Witcher3-On-MacOS/7.png)

You will see the Steam installer running. Just click "Next" and "Install" as you would do on Windows.

![Whisky](/static/img/2024-03-07-Run-Witcher3-On-MacOS/8.png)

![Whisky](/static/img/2024-03-07-Run-Witcher3-On-MacOS/9.png)

![Whisky](/static/img/2024-03-07-Run-Witcher3-On-MacOS/10.png)

![Whisky](/static/img/2024-03-07-Run-Witcher3-On-MacOS/11.png)

Just wait a bit, and your Steam will be installed and opened.

![Whisky](/static/img/2024-03-07-Run-Witcher3-On-MacOS/12.png)

### Install Witcher 3

Now, you can install Witcher 3 as you would do on Windows. Just search for Witcher 3 in your library and click on "Install".

## Final Thoughts

This method also allows you to run other Windows games on MacOS.
However, not all games are supported, and some games may not run as smoothly as they would on Windows.

For some common issues and solutions, you can check the
[Whisky's Official Documentation](https://github.com/Whisky-App/Whisky/wiki/Game-Support).
