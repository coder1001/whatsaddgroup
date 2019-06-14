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

await page.setCookie(cookieObject);
  await page.screenshot({path: 'example.png'});
  await delay(10000);
 
  await browser.close();
})();