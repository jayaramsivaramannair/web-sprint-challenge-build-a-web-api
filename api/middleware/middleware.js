const actions = require("../actions/actions-model.js")
const projects = require("../projects/projects-model.js")

function logger() {
    return (req, res, next) => {
        const time = new Date().toISOString()
        console.log(`${req.method} request is made to ${req.url} at ${time}`)
        next()
    }
}

function validateProjects() {
    return (req, res, next) => {
        projects.get(req.params.id)
            .then((project) => {
                if (project) {
                    req.project = project
                    next()
                } else {
                    res.status(404).json({
                        message: "project does not exist",
                    })
                }
            })
            .catch((error) => {
                next(error)
            })
    }
}

function validateProjectCreator() {
    return (req, res, next) => {
        if (!req.body.name) {
            return res.status(400).json({
                message: "missing required name field",
            })
        } else if (!req.body.description) {
            return res.status(400).json({
                message: "missing required description field",
            })
        }

        next()
    }
}

function validateActions() {
    return (req, res, next) => {
        actions.get(req.params.id)
            .then((action) => {
                if (action) {
                    req.action = action
                    next()
                } else {
                    res.status(404).json({
                        message: "action does not exist",
                    })
                }
            })
            .catch((error) => {
                next(error)
            })
    }
}

module.exports = {
    logger,
    validateActions,
    validateProjectCreator,
    validateProjects,
}