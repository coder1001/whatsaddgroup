const puppeteer = require('puppeteer');
const info = require('./config');

function delay(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

(async () => {
  
  /*const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized']
 })*/

 const wsChromeEndpointurl = info.webSocketDebuggerUrl;

 // Use puppeteer.connect instead of launch to remote control an existing browser instance instead of creating a new chromium instance
 // This is neccessary to avoid the QR authentification every time
 const browser = await puppeteer.connect({
  browserWSEndpoint: wsChromeEndpointurl,
  brwoserURL:"https://web.whatsapp.com"
})

  // create a new page
  const page = await browser.newPage();

  // (optional) set viewport
  /*
  await page.setViewport({ width: 1366, height: 768});
  */

  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36');
  
  // go to website
  await page.goto('https://web.whatsapp.com');

  // (optional) create screenshot

  /*
  await page.screenshot({path: 'example.png'});
  */
 
  await page.waitForSelector('._3j8Pd');

  // group creation
  /* 
  await page.click('._3j8Pd:nth-child(3)');
  await page.click('._3j8Pd span div ul li:nth-child(1)');
  await page.type('._44uDJ', 'Raphael Langer');
  await page.waitForSelector('.rK2ei div:nth-child(2) div:nth-child(1)');
  await page.click('.rK2ei div:nth-child(2) div:nth-child(1)');
  await page.waitForSelector('#app > div > div > div._37f_5 > div._3HZor._3kF8H > span > div > span > div > div > span > div[role=button]');
  await page.click('#app > div > div > div._37f_5 > div._3HZor._3kF8H > span > div > span > div > div > span > div[role=button]');
  await page.type('#app > div > div > div._37f_5 > div._3HZor._3kF8H > span > div > span > div > div > div:nth-child(2) > div > div._3hnO5 > div > div._3u328.copyable-text.selectable-text','Automated generated group');
  await page.click('#app > div > div > div._37f_5 > div._3HZor._3kF8H > span > div > span > div > div > span > div > div');
  
  */
  // click to go into settings

  await page.type('#side > div._2HS9r > div > label > input',info.groupName);
  await delay(500);
  await page.click('._3La1s div div div div:nth-child(2)');
  await page.click('#main > header > div._3V5x5');

  await delay(500);
  // click to go to invite group
  await page.click('#app > div > div > div._37f_5 > div._3HZor._1C9rS > span > div > span > div > div > div._3xdMj > div:nth-child(5) > div:nth-child(3) > div._2WP9Q > div > div');
  
  await delay(500);
  // get href
  const Href = await page.$eval('a#group-invite-link-anchor', span => span.getAttribute('href'));
  console.log("Link ist: ", Href);

  await delay(500);
  await page.click('.qfKkX');

  await delay(500);
  await page.click('.qfKkX');
  // type link to chat
  await page.type('#main > footer > div._2i7Ej.copyable-area > div._13mgZ',"Audomated pushed text: "+ Href);
  await delay(1000);
  //await page.type(String.fromCharCode(13)); // doesnt work?!!
  console.log("Trying press enter");
  //await page.press('Enter'); // doesnt work=!=""
  //await page.click('button[class=_3M-N-]');
  


  

 
  //await browser.close();
})();