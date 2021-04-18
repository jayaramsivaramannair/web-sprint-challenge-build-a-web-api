const express = require('express');
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to my process and actions API - 1st Sprint Challenge",
    })
})

server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        message: "Something went wrong with the request",
    })
})

module.exports = server;
