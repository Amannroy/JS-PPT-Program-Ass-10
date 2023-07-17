const express = require('express');
const app = express();

let counter = 0;

// Endpoint to get the counter value
app.get('/', (req,res) => {
    res.json({counter: counter});
});

// Endpoint to increment the counter by 1
app.get('/increment', (req,res) => {
    counter++;
    res.json({counter: counter});
});

// Endpoint to decrement the counter by 1
app.get('/decrement', (req,res) => {
    counter--;
    res.json({counter: counter});
});

// Start the server
app.listen(3000, ()=> {
    console.log('Server is running on post 3000');
});