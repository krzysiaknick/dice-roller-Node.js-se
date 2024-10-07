const express = require('express')
app = express()

const cors = require("cors")

var url = require('url');
var dt = require('./date-time');

const port = process.env.PORT || 3000
const majorVersion = 1
const minorVersion = 3

// Use Express to publish static HTML, CSS, and JavaScript files that run in the browser. 
app.use(express.static(__dirname + '/static'))



app.use(cors({
    origin: function (origin, callback) {
        if (origin === 'https://gray-ocean-0ff8b4210.5.azurestaticapps.net' || !origin) { 
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));






// generates random dice roll 1-6 and responds in JSON 
app.get('/d6', (request, response) => {
    console.log('Calling "/d6" on the Node.js server.');

    const max = 6;
    const min = 1;
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let diceRoll = getRandomInt(min, max);

    response.json({ diceRoll: diceRoll });  // Send the number as JSON
});




// Custom 404 page.
app.use((request, response) => {
  response.type('text/plain')
  response.status(404)
  response.send('404 - Not Found')
})

// Custom 500 page.
app.use((err, request, response, next) => {
  console.error(err.message)
  response.type('text/plain')
  response.status(500)
  response.send('500 - Server Error')
})

app.listen(port, () => console.log(
  `Express started at \"http://localhost:${port}\"\n` +
  `press Ctrl-C to terminate.`)
)