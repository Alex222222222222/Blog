---
title: "Download encrypted HLS content with ffmpeg"
date: "2024-02-23"
tags: ["Tutorial", "MacOS", "Linux", "M3U8", "FFMPEG"]
toc: false
categories: ["Tutorial"]
description: "Download encrypted HLS content with ffmpeg"
---

HLS (HTTP Live Streaming) is a widely used streaming protocol that breaks video
files into small chunks and serves them over HTTP.
It's a popular choice for streaming video content on the web,
and it's used by many platforms.

In this tutorial, I'll show you how to download encrypted HLS content.

## Prerequisites

You'll need to have `ffmpeg` installed on your system.

## Find the M3U8 file

The first step is to find the M3U8 file.
This file contains the URLs of the video chunks and the encryption key.

You can find the M3U8 file by inspecting the network requests
in your browser's developer tools when loading the page.

## Download the M3U8 file

Once you have the M3U8 file, you can download it using `ffmpeg`:

```bash
ffmpeg -i "https://example.com/video.m3u8" -c copy -bsf:a aac_adtstoasc output.mp4
```
