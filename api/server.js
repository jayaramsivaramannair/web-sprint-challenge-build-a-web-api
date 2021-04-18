const express = require('express');
const { logger } = require("../api/middleware/middleware.js")
const server = express();
const actionsRouter = require("./actions/actions-router.js");
const projectsRouter = require("./projects/projects-router.js");

// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.use(express.json())

server.use(logger())

server.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to my process and actions API - 1st Sprint Challenge",
    })
})

server.use(projectsRouter)

server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        message: "Something went wrong with the request",
    })
})

module.exports = server;
