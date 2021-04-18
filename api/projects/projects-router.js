// Write your "projects" router here!
const express = require('express');

const projects = require("./projects-model");

const { validateProjects, validateProjectCreator } = require("../middleware/middleware.js")

const router = express.Router();

router.get('/api/projects', (req, res, next) => {
    projects.get()
        .then((projects) => {
            res.status(200).json(projects)
        })
        .catch((error) => {
            next(error)
        })
});

router.get('/api/projects/:id', validateProjects(), (req, res) => {
    res.json(req.project)
})

router.post('/api/projects', validateProjectCreator(), (req, res, next) => {
    projects.insert(req.body)
        .then((project) => {
            res.status(200).json(project)
        })
        .catch((error) => {
            next(error)
        })
})

router.put('/api/projects/:id', validateProjectCreator(), validateProjects(), (req, res, next) => {
    projects.update(req.params.id, req.body)
        .then((project) => {
            res.status(200).json(project)
        })
        .catch((error) => {
            next(error)
        })
})

router.delete('/api/projects/:id', validateProjects(), (req, res, next) => {
    projects.remove(req.params.id)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((error) => {
            next(error)
        })
})

module.exports = router