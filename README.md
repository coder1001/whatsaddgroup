# Step 1: Preperations

Start a chrome browser in debug mode

## Windows: 
start chrome.exe --remote-debugging-port=9222 --user-data-dir=remote-profile

For Windows, next you’ll open a browser to http://127.0.0.1:9222/json

## Mac: 
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir')

For Mac, once run you’ll see a printout like this:
DevTools listening on ws://127.0.0.1:9222/devtools/browser/41a0b5f0–6747–446a-91b6–5ba30c87e951

# Step 2: Whatsapp Authentification
Go to web.whatsapp.com and handle authentification with your smartphone

# Step 3: Grab the connection url

Add .env file cp .env.dist .env

Go to *http://localhost:9222/json/version* in your recently generated browser and put webSocketDebuggerUrl to .env file

# Step 4: Start Script

You can start the scripts without Step 1 to 3. Then you need to do the authentification with your smartphone every time. 

node editgroup.js
node creategroup.js

# Step 4: Express

Start express server via 

node index.js

Than call

localhost:3000/create/group?groupName=[GroupNameHere]&addUser=[addUserHere]