const express = require('express');

const app = express();

app.get('/random', (req,res) => {
    // Generate a random number between 0 and 100
    const randomNumber = Math.floor(Math.random() * 100);
    res.json({ random: randomNumber})
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});