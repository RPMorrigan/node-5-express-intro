// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

import express from 'express';
import fs from 'fs/promises';
import moment from 'moment';
import horoscope from 'horoscope';


// Express instantce
const app = express();

// I/O port
const port = 3000;

// Specifies we're using json
app.use(express.json());

app.listen(3000, () => {
    console.log(`Beep Boop. Server listening to port: ${port}`)
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// ---------------------------------
// Our very first API Endpoints
// ---------------------------------

// The following takes 2 parameters
// The first is the endpoint, defining the URL path the server should listen to.
// The second being the callback function, what we do when we receive a request at this endpoint.

app.get("/", (req, res) => {
    res.send("Beep Boop!")
});

app.get("/say-good-morning", (req, res) => {
    res.send("Good morning!")
});

// --------------------------------
// 🚀 LEVEL 1 CHALLENGES
// --------------------------------

// 1. 🏆 Add a /goodbye endpoint that responds with "Goodbye, see you later!"

app.get("/goodbye", (req, res) => {
    res.send("Goodbye, see you later!");
});

// 2. 🏆 Add a /happy-birthday endpoint that responds with "Happy birthday!!!"

app.get("/happy-birthday/:userName", (req, res) => {
    const userName = req.params.userName
    res.send(`Happy birthday, ${userName}!`);
});

// --------------------------------
// 🚀 LEVEL 2 CHALLENGES — ADDING DYNAMIC PARAMETERS
// --------------------------------

// 1. 🏆 Add a /happy-birthday/:name endpoint says "Happy birthday, [name]!!!"

// 2. 🏆 Add a /say-hello/:name/:language endpoint that says hello in multiple languages. Examples:
//      - If language = "English", respond with "Hello, [name]!"
//      - If language = "Spanish", respond with "Hola, [name]!"
//      - If language = "Vietnamese", respond with "Xin chao, [name]!"
//      - If language = "Turkish", respond with "Merhaba, [name]!"
//      - Add as many languages as you want!
//      - Otherwise, respond with "Language not supported.""

app.get("/say-hello/:name/:lang", (req, res) => {
    const name = req.params.name
    const lang = req.params.lang

    const greetings = {
        "english": "Hello",
        "spanish": "Hola",
        "vietnamese": "Xin chao",
        "turkish": "Merhaba",
        "french": "Bonjoir",
        "japanese": "Konnichiwa",
    };

    if (!greetings[lang]) {
        res.send("Woops! Either your input was invalid, or we don't offer that language. Try again.")
    }

    if (greetings[lang]) {
        res.send(`${greetings[lang]}, ${name}!`);
    }
});

// --------------------------------
// 🚀 LEVEL 3 CHALLENGES — EVEN MORE DYNAMIC PARAMETERS
// --------------------------------

// 1. 🏆 Add a /calculate-dog-years/:dogName/:humanYears endpoint that calculates a dog's age in dog years. Refer to your dogAgeCalculator.js file.

app.get("/calculate-dog-years/:dogName/:humanYears", (req, res) => {

    const dogName = req.params.dogName;
    const humanYears = Number(req.params.humanYears);
    let dogYears;

        if (!humanYears) {
            return console.log('Whoops! Something was off about your inputs!');
        }

        if (humanYears === 1) {
            dogYears = 15;
        }
        
        if (humanYears === 2) {
            dogYears = 24;
        }

        if (humanYears > 2) {
            dogYears = 24 + ((humanYears - 2) * 5)
        }

        const literal = `Your dog, ${dogName}, is ${humanYears} years old, but that's ${dogYears} years old in dog years!`;

        res.send(`${literal}`)

});

// 2. 🏆 Add a /calculate-tip/:bill/:tipPercentage/:numGuests endpoint that calculates the amount each guests owes. Refer to your tipCalculator.js file.

app.get("/calculate-tip/:bill/:tipPercentage/:numGuests", (req, res) => {

    const bill = req.params.bill;
    const tipPercentage = req.params.tipPercentage;
    const numGuests = req.params.numGuests;

    const due = (bill * (tipPercentage / 100)) / numGuests;

    res.send(`${parseFloat(due).toFixed(2)}`);

})

// --------------------------------
// LEVEL 4 CHALLENGES — USING THE FILE SYSTEM MODULE
// --------------------------------

// 1. 🏆 Add a /get-birthstone/:month endpoint that tells the user the birthstone for the inputted month using the fs module. Use the birthstones-data.json file in this folder.

app.get("/get-birthstone/:month", async (req, res) => {

    const month = req.params.month;

    const data = await fs.readFile('birthstones-data.json', 'utf8');
    const birthstones = JSON.parse(data);

    const stone = birthstones[month]
        ? `The birthstone for ${month} is ${birthstones[month]}`
        : 'Try again. Please make sure to capitalize your input.';
    
    res.send(`${stone}`);
});
        
// 2. 🏆 Add a /get-all-pizza-orders endpoint that responds with the array of pizza orders. Use the pizza-orders-data.json file in this folder.

app.get("/get-all-pizza-orders", async (req, res) => {

    const data = await fs.readFile('pizza-orders-data.json', 'utf8');
    const pizzas = JSON.parse(data);

    let items = '';

    for( let pizza in pizzas) {
        items += pizzas[pizza] + '\n';
    }

    res.send(`${items}`)
});


// 3. 🏆 Add a /get-one-pizza-order/:index endpoint that responds with the specified pizza order.

app.get("/get-one-pizza-order/:index", async (req, res) => {
    
    const data = await fs.readFile('pizza-orders-data.json', 'utf8');
    const order = JSON.parse(data);

    const index = req.params.index;
    let item = '';

    if (!order[index]) {
        item = "Sorry, your pizza isn't on the menu. Try again.";
    }

    if (order[index]) {
        item = order[index];
    }

    res.send(`${item}`);

})

// --------------------------------
// 🚀 LEVEL 5 CHALLENGES — USING THIRD-PARTY MODULES
// --------------------------------

// 1. 🏆 Add a /is-leap-year/:year endpoint that responds with whether the specified year is a leap year. Use the moment third-party node module and refer to your leap-year.js file.

app.get("/is-leap-year/:year", (req, res) => {
        let year = req.params.year;

        res.send(moment(year).isLeapYear());
    })

// 2. 🏆 Add a /get-signs/:month/:day/:year endpoint that responds with the user's astrological and zodiac signs based on their inputted birthday. Use the horoscope third-party node module and refer to your sign-finder.js file.

app.get("/get-signs/:month/:day/:year", (req, res) => {

    const userMonth = Number(req.params.month);
    const userDay = Number(req.params.day);
    const userYear = Number(req.params.year);

    let reply = '';

    const tropical = horoscope.getSign({ month: userMonth, day: userDay });
    const chiZodiac = horoscope.getZodiac(userYear);

    if (isNaN(userDay) || isNaN(userMonth) || isNaN(userYear)) {
           return res.send('Invalid month, day or year. Try again!');
        }

    if (userDay && userMonth && userYear) {
        reply = `Your astrological sign is ${tropical} and your zodiac sign is the ${chiZodiac}.`
    }

    res.send(reply);

})