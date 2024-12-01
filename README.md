# Youtube/Soundcloud downloader

This is a tool to download youtube and soundcloud content via a webpage.

## Reason

I was tired of having to find a website or tool online with ads and wanted to try making my own.
I specifically wanted a tool that would allow me to download music from youtube or soundcloud with a little configuration and import into Apple Music without having to update any metadata in Apple Music.

Since I started this project, I have found other similar tools, but I dont think they do the same things as mine.

### Note

As I am not too familiar with C# development, I made use of ChatGPT for alot of it. However, I also looked up alot of what was suggested to make sure that what it was giving me was valid.

## Features

Download audio from youtube in a few formats.
Download from soundcloud.

Downloads are tagged using TagLibSharp, allowing for drag and drop into Apple Music with metadata and cover art.

For Soundcloud - Specifying custom image sources
For Youtube - Cropping images into 800x800 (cover art in Apple Music expects this as a minimum from what I could find).

As the tool was built with Docker in mind for deployment, the entire tool can be run inside of docker and you only need to have docker installed to use it.

## Installation instructions

1. Either clone the repo or download as zip
   1a. If you donwloaded the zip, extract the contents to some where on your drive.
2. Once you have the files somewhere on your drive, open a new terminal in the root of the project.
   2a. You can tell if you're in the correct place if you can see a docker-compose.yml file.
3. Pick either Docker or Non docker section variants below, once done move onto step 4
4. Open a browser to <localhost>:4200 (if using docker, you can change the ports by changing the ports in the docker-compose.yml file).
5. Go to the settings page and set the base path to

```
<localhost>:4201
```

Replace localhost with where you have deployed it. Localhost only works for when being run on the same machine as accessed.

### Docker

In the terminal window run

```
docker compose up --build
```

If you get an error regarding permissions, either add docker to your group or run with sudo (happened to me on my rpi)

```
sudo docker compose up --build
```

As this will take up your terminal window, I recommend stopping it from the terminal (ctrl + c) and startin the containers again from docker desktop/portainer or other tool.

### Non docker

If you dont want to run the tool inside of docker you can do the following.

#### Pre-requisites

(Look into steps 3, 4, and 5 before starting, you might be able to skip steps 3 and 4)

1. Install node (latest stable should be fine, if not 20.17.0)
2. Install dotnet 8 sdk
3. Install python3
4. Install ffmpeg
5. Install yt-dlp

#### Front end

cd into the folder FrontEnd
run

```
npm install
```

and then

```
npx ng build
```

#### Api

Note these instructions may be wrong, I am just copying what I have in the docker file.
As I was developing the Api using docker.

cd into the api folder
run

```
dotnet build -c Release -o /build
```

```
dotnet publish -c Release -o /publish
```

then cd into the publish folder

```
dotnet Api.dll
```

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

```

```

```

```
