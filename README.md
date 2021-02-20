# totally-legit-spotify-downloader
![](https://i.giphy.com/media/Vk7VKS50xcSC4/giphy.webp)

# Want to download your spotify playlist?
I wanted to download songs from a spotify playlist, doing it one by one? No way. So I looked around and nothing seemed to work. So I obviously had to made my own script for it.  
This script does not actually download from Spotify, since that is very hard. It instead uses some website I found that seemed to have a lot of songs. https://myfreemp3.vip/  
It does however get the song data from Spotify

## 1. Copy all songs in a spotify playlist songs.txt
Should look something like this:  
https://open.spotify.com/track/1HXchhExSIsJODlUyAXPlB    
https://open.spotify.com/track/3za3bQrlpdEwcT2C4t5Cag

## 2. Execute with node app 
npm install  
node app

### 2.1 Node requests the URLs and get the song names from Spotify
This is done all at once, very fast. Node is great for this.

### 2.2 Puppeteer opens a virtual browser and access mp3 downloading site
Now the song name is put in search field and "search" is virtually pressed. Then wait 5 seconds so the page will have had time to load, then get the first results download link.

### 2.3 Downloading
The songs starts to download

## 3 Done!
The script has about an 90% success rate by my testing. This could be modified to use another website for downloading the songs. If you have uncommon songs the success rate will be a lot lower.
