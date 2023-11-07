---
title: How to uninstall a app on MacOS
date: "2023-04-26"
tags: ["Mac", "App"]
toc: True
categories: ["Mac"]
---

## Introduction

Uninstalling a software on a system has long being a headache problem.
If you install a software using a package manager like `brew`, or `apt`.
It is easy. You simply do

```shell
# brew
brew remove [package-name]
# use auto remove to remove the dependency
brew autoremove

# apt
apt purge [package-name]
# use auto remove to remove the dependency
apt autoremove
```

If you install the app using app store.
Just uninstall it in the app store.

However, if you install the app by just copy the app into `/Applications`.
Then, simply remove the app itself is clearly not enough.
For instance, steam store all the game you download in the '~/Library' folder.
If you just remove the app itself, there will be tons of files left.

And there is a app that help us do that.
The [AppCleaner](https://freemacsoft.net/appcleaner/).

## Download

Just go to the webpage [AppCleaner](https://freemacsoft.net/appcleaner/),
and select the latest version.

## Uninstall App

Open the app,
click the list icon in the right up conner,
type in the app you want to uninstall,
for instance `Steam`.
Select the App you want to uninstall,
then AppCleaner will search for all the files of the App,
you could unselect the files you do not want to delete.
Click remove, then, you are all set.

![Steam Sample](/static/img/2023-04-26-Uninstall-App-On-MacOS/1.png)
