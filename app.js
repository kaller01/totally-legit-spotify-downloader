const puppeteer = require('puppeteer');
const Downloader = require('nodejs-file-downloader');
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

process.setMaxListeners(0);

const getSongName = (link) => {
    return new Promise((resolve,reject) => {
        request(link, function (error, response, body) 
        {
          if (error) {
              console.log(error);
              return
          }
          var $ = cheerio.load(body);
          var title = $("title").text();
          title = title.replace(' | Spotify', "").replace("song by ","")
          resolve(title);
        });
    });
    
}




const downloadSong = async (song) =>{
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();


    await page.goto('https://myfreemp3.vip/lite');
    console.log("Page loaded")


    await page.type('#query', song);

    // await page.press('Enter');
    // await page.click("body > div.wrapper > div.container > div > span > button")
    // await page.click('submit');
    const [button] = await page.$x("/html/body/div[2]/div[1]/div/span/button");
    if (button) {
        console.log("clicked")
        await button.click();
    }

    await page.waitFor(5000);

    await page.screenshot({path: "test.png"})

    let link = await page.$eval('#result > div.list-group > li:nth-child(1) > a.name', span => span.getAttribute('href'));
    // console.log(link)
    browser.close();

    if(link){
        const downloader = new Downloader({
            url: link,//If the file name already exists, a new file with the name 200MB1.zip is created.     
            directory: "./downloads",//This folder will be created, if it doesn't exist. 
            fileName: song +".mp3"
          })
          try {
            await downloader.download();//Downloader.download() returns a promise.
      
            // console.log(song + ' downloaded');
          } catch (error) {//IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
            //Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
            console.log('Download failed '+ song + " " + link)
          }
    }  
}

var songs = fs.readFileSync('songs.txt').toString().split("\n");
songs.forEach(song => {
    getSongName(song).then((title)=>{
        console.log(title)
        downloadSong(title);
    });
});



