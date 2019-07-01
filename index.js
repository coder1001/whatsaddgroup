require('dotenv').config();
const express = require('express')
const puppeteer = require('puppeteer');

const info = require('./config');
const id = require('./identifier');

const app = express();

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
 
app.get('/', function (req, res) {
    console.log('Main');
  res.send('Hello World')
})


app.get('/test', function (req, res) {
    console.log('test');
    console.log(req.query);
  res.send(`The Groupname is ${req.query.name}`);
})



app.get('/create/group', function (req, res) {
    console.log('Group Creation');


    // group name (25 char limit)
    let groupName = (req.query.groupName || info.defaultGroupName).substring(0, 25);
    // add user
    let addUser = req.query.addUser || info.defaultAddUser;

    // puppeteer automation begins ...
    (async () => {
  
        /*const browser = await puppeteer.launch({
          headless: false,
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized']
       })*/
      
       try {
        const wsChromeEndpointurl = info.webSocketDebuggerUrl;
      
        // Use puppeteer.connect instead of launch to remote control an existing browser instance instead of creating a new chromium instance
        // This is neccessary to avoid the QR authentification every time
        const browser = await puppeteer.connect({
         browserWSEndpoint: wsChromeEndpointurl,
         brwoserURL: info.whatsAppWeb,
       })

       // Check if whatsapp already open
       const pages = await browser.pages();
       let page;
       pages.forEach(async p => {
        console.log(p.url());
         if (p.url() === info.whatsAppWeb) {
            page = p;
         }
       });
      
       const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36';
       if (!page) {
         // create a new page
         page = await browser.newPage();
         page.setUserAgent(userAgent);
         // go to website
          await page.goto(info.whatsAppWeb);
       }
      
         await page.waitForSelector('._3j8Pd');
       
         //let groupNumber = 0;
         //while (groupNumber < 3){
       
            //************************** */
          // GROUP CREATION
          //************************** */
          
          // 1. click three dots
          await page.click(id.button.threedots);
      
          // 2. click 'Create new group'
          await page.click(id.button.newGroup);
      
          // 3. Search for Person
          await page.type(id.input.searchPerson, addUser);
      
          // 4. wait for listitem to be there
          await page.waitForSelector(id.items.firstListItem);
      
          // 5. click on listitem to add person to invitelist
          await page.click(id.items.firstListItem);
      
          //(optional) Repeat step 2 and 5 to invite more people
      
          // 6. Wait for next button to be visible
          await page.waitForSelector(id.button.startCreatingGroup);
      
          await delay(300);
          // 7. Click on "next"
          await page.click(id.button.startCreatingGroup);
          await delay(300);

          // 8. type in groupname
          const searchField = '#app > div > div > div._37f_5 > div._3HZor._3kF8H > span > div > span > div > div > div:nth-child(2) > div > div._3hnO5 > div > div._3u328.copyable-text.selectable-text';
          await page.type(searchField, groupName);
          
          const input = await page.$('input[type="file"]');
          await input.uploadFile('./img/icon.jpg');
      
      
          await page.waitForSelector(id.button.confirmImg);
      
          // Zoom out
          await page.click(id.button.zoomOut);
          await delay(500);
          await page.click(id.button.zoomOut);
          await delay(500);
          await page.click(id.button.zoomOut);
          await delay(500);
          await page.click(id.button.zoomOut);
          await delay(500);

          await page.click(id.button.confirmImg);
          
          //9. click btn to create group :)
          await page.waitForSelector(id.button.finishCreatingGroup);
          await delay(1000);
          await page.click(id.button.finishCreatingGroup);
             
          // set 20sec delay due to notifications
          await delay(3000);

          // Clear search field
          await delay(3000);
          await page.click(id.button.groupSettings);

          await delay(1500);
          // click to go to invite group
          await page.click(id.button.inviteLinkMenu);
          
          await delay(1500);
          // get href
          const Href = await page.$eval('a#group-invite-link-anchor', span => span.getAttribute('href'));
          console.log("Link ist: ", Href);

          await delay(500);
          await page.click(id.button.settingsBack);

          // Leave group
          await delay(500);
          await page.click(id.button.leaveGroup);
          await delay(500);
          await page.click(id.button.popupConfirm);
          await delay(1500);

          // Delete Group
          await page.click(id.button.deleteGroup);
          await delay(500);
          await page.click(id.button.popupConfirm);
          await delay(500);

          // Wait for notifications
          await delay(15000);

          res.json({
            groupName: Href
          });
       } catch (e) {
         console.error(e);
        res.json({
          groupName: null,
          error: e.message || 'Error',
        });
       }
      
      })();

    
  })
 
app.listen(process.env.PORT || 3000);