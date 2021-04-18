// Write your "actions" router here!
const express = require('express');

const actions = require("./actions-model");
const projects = require("../projects/projects-model");

const { validateActionPost, validateActionUpdate, validateActions, validateProjects } = require("../middleware/middleware.js");

const router = express.Router();

router.get('/api/actions', (req, res, next) => {
    actions.get()
        .then((actions) => {
            res.status(200).json(actions)
        })
        .catch((error) => {
            next(error)
        })
});

router.get('/api/actions/:id', validateActions(), (req, res, next) => {
    res.status(200).json(req.action)
})


router.post('/api/actions', validateActionPost(), (req, res, next) => {
    projects.get(req.body.project_id)
        .then((project) => {
            if (project) {
                actions.insert({ ...req.body, project_id: req.body.project_id })
                    .then((action) => {
                        res.status(200).json(action)
                    })
                    .catch((error) => {
                        next(error)
                    })
            } else {
                res.status(404).json({
                    message: "project does not exist",
                })
                return;
            }
        })
        .catch((error) => {
            next(error)
        })
})

router.put('/api/actions/:id', validateActionUpdate(), validateActions(), (req, res, next) => {
    actions.update(req.params.id, req.body)
        .then((action) => {
            res.status(200).json(action)
        })
        .catch((error) => {
            next(error)
        })
})

router.delete('/api/actions/:id', validateActions(), (req, res, next) => {
    actions.remove(req.params.id)
        .then((response) => {
            console.log(response)
            res.status(200).json({
                message: "Action record successfully deleted"
            })
        })
        .catch((error) => {
            next(error)
        })
})

module.exports = router