const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
    console.log('Main');
  res.send('Hello World')
})



app.get('/create/group', function (req, res) {
    console.log('Group Creation');
    res.send('Hello World')
  })
 
app.listen(3000)