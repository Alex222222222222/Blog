---
title: How to set up GPGSuite and GPGMail on Mac
date: "2023-04-17"
tags: ["Mac", "Encryption", "Secure", "GPG", "GPGMail", "GPGSuite"]
toc: True
categories: ["Mac", "Secure"]
---

## Introduction

GPG Suite is an open-source software package for macOS
that provides encryption and decryption of emails, files,
and directories using the OpenPGP encryption standard.
OpenPGP is a widely used standard for secure email communication
that provides end-to-end encryption,
which means that only the sender and recipient of an encrypted message
can read its contents.

GPG Suite includes several tools,
including GPGMail for encrypting and signing emails,
GPG Keychain for managing OpenPGP keys,
and GPG Services for encrypting and decrypting files and directories.
It also includes GPGPreferences,
which provides a user interface for configuring GPG Suite settings.

GPG Suite is popular among users who require secure communication and privacy protection,
such as journalists, activists, and government officials.
It is available for free download and use,
although users can make a donation to support the ongoing development of the software.

![Screenshot of GPG Suite](/static/img/2023-04-17-GPGMail-Mac/1.png)

## Installation

Check [Free-GPGMail](https://github.com/Free-GPGMail/Free-GPGMail) project.

1. Download the latest version of Free-GPGMail.

    Using Homebrew:

    ```bash
    brew install --cask free-gpgmail
    ```

2. Restart Mail.app, go to `Preferences -> General -> Manage Plugins....`

    If the "Manage Plugins" button is not present in the lower left corner, open a terminal and run:

    ``` bash
    sudo defaults write “/Library/Preferences/com.apple.mail” EnableBundles 1
    defaults write com.apple.mail EnableBundles -bool true
    ```

    Then restart Mail.app again.

    - Make sure that `GPGMailLoader_*.mailbundle`, if present, is disabled.
    - Enable the `Free-GPGMail_<version>.mailbundle`.
    - Apply and Restart Mail.

3. In Mail.app, check `Preferences -> Free-GPGMail`. If it says that you are in Trial Mode or Decryption Only Mode, hit Activate. It will perform a dummy activation routine.

## Manage Keys

Also check [GPGTools](https://gpgtools.tenderapp.com/kb/how-to/first-steps-where-do-i-start-where-do-i-begin-setup-gpgtools-create-a-new-key-your-first-encrypted-email).