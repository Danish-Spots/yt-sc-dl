# Youtube/Soundcloud downloader

This is a tool to download youtube and soundcloud content via a webpage.

## Reason

I was tired of having to find a website or tool online with ads and wanted to try making my own.
I specifically wanted a tool that would allow me to download music from youtube or soundcloud with a little configuration and import into Apple Music without having to update any metadata in Apple Music.

Since I started this project, I have found other similar tools, but I dont think they do the same things as mine.

## Features

Download audio from youtube in a few formats.
Download from soundcloud.

Downloads are tagged using TagLibSharp, allowing for drag and drop into Apple Music with metadata and cover art.

For Soundcloud - Specifying custom image sources
For Youtube - Cropping images into 800x800 (cover art in Apple Music expects this as a minimum from what I could find).

## Tech

Front end

- Angular
  - NgRx
  - Angular Material
  - CropperJs

Backend

- C# asp.net webapi
  - yt-dlp
  - TagLibSharp
