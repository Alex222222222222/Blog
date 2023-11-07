---
title: How to Install and Use Pyenv
date: "2023-02-27"
tags: ["Python", "Tutorial", "Open Source", "pyenv"]
toc: true
categories: ["Tutorial"]
---

## Pyenv

### Install the pyenv
```bash
brew install pyenv-virtualenv
```

Add the following line to .zshrc or .zprofile to run pyenv
```bash
# python env auto activation
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
if which pyenv-virtualenv-init > /dev/null; then eval "$(pyenv virtualenv-init -)"; fi
```

To run pyenv in the current session, run
```bash
source ~/.zshrc
```

Install python version
List all available python version
```bash
pyenv install —list 
```

Install a specific version
```bash
pyenv install $VERSION 
```

List all installed versions
```bash
P
```

### Change versions
Set the global python version for the system
```bash
pyenv global $VERSION
```

Set local version
```bash
pyenv local $VERSION 
```

Create a specific virtualenv for repo
```bash
pyenv virtualenv $PYTHON_VERSION $NAME
```

Use virtualenv for repo
```bash
pyenv local $NAME 
```

