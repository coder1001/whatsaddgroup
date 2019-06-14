const puppeteer = require('puppeteer');
 

function delay(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

(async () => {
  //const browser = await puppeteer.launch();

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
 })

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36');
  await page.goto('https://web.whatsapp.com');

  await page.evaluate(() => {
    localStorage.setItem('whatsapp-mutex', 'x227628220:init_1560456518826');
    localStorage.setItem('WABrowserId', 'KnkvXYTdGPEZhJHpiC162w==');
  });

  let cookieObject ={
    name:"JSESSIONID",
    value:"9C8E6659B14C2963EDED73C16BB0868A",
    Expires:"Tue, 19 Jan 2038 03:14:07 GMT"
    }

  //await page.setCookie(cookieObject);
  //await page.screenshot({path: 'example.png'});
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

  await page.type('#side > div._2HS9r > div > label > input','Automated generated group');
  await delay(1000);
  await page.click('._3La1s div div div div:nth-child(2)');
  await page.click('#main > header > div._3V5x5');

  // click to go to invite group
  await page.click('#app > div > div > div._37f_5 > div._3HZor._1C9rS > span > div > span > div > div > div._3xdMj > div:nth-child(5) > div:nth-child(3) > div._2WP9Q > div > div');
  
  // get href
  const Href = await page.$eval('#group-invite-link-anchor', span => span.getAttribute('href'));
  console.log("Link ist: ", Href);

  // type link to chat
  await page.type('#main > footer > div._2i7Ej.copyable-area > div._13mgZ',"Audomated pushed text: "+ Href);

 
  await browser.close();
})();