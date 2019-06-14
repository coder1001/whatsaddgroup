const puppeteer = require('puppeteer');
const info = require('./config');
const id = require('./identifier');

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

  let groupNumber = 0;
  while (groupNumber < 3){

      //************************** */
    // GROUP CREATION
    //************************** */
    
    // 1. click three dots
    await page.click(id.button.threedots);

    // 2. click 'Create new group'
    await page.click(id.button.newGroup);

    // 3. Search for Person
    await page.type(id.input.searchPerson, 'Raphael Langer');

    // 4. wait for listitem to be there
    await page.waitForSelector(id.items.firstListItem);

    // 5. click on listitem to add person to invitelist
    await page.click(id.items.firstListItem);

    //(optional) Repeat step 2 and 5 to invite more people

    // 6. Wait for next button to be visible
    await page.waitForSelector(id.button.startCreatingGroup);

    // 7. Click on "next"
    await page.click(id.button.startCreatingGroup);

    // 8. type in groupname
    await page.type('#app > div > div > div._37f_5 > div._3HZor._3kF8H > span > div > span > div > div > div:nth-child(2) > div > div._3hnO5 > div > div._3u328.copyable-text.selectable-text',info.groupName);
    
    const input = await page.$('input[type="file"]');
    await input.uploadFile('./img/icon.jpg');


    await page.waitForSelector(id.button.confirmImg);

    await page.click(id.button.confirmImg);
    
    //9. click btn to create group :)
    await page.waitForSelector(id.button.finishCreatingGroup);
    await delay(1000);
    await page.click(id.button.finishCreatingGroup);
    
    groupNumber ++;

    await page.waitForSelector(id.input.chat);
    await delay(1000);
    await page.type(id.input.chat,`This group was automatically generated. Group No. ${groupNumber}`);
     await page.click('button[class=_3M-N-]');

     // set 20sec delay due to notifications
     await delay(10000);

  

  }
  

  //************************** */
  // GROUP SEARCH AND EDIT
  //************************** */

  // click to go into settings

  /*await page.type('#side > div._2HS9r > div > label > input',info.groupName);
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
  //await page.click('button[class=_3M-N-]');*/
  


  

 
  //await browser.close();
})();