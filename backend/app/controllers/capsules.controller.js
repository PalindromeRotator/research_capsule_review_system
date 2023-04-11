const db = require("../models");
const Capsules = db.capsules;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const capsules = {
        title: req.body.title,
        section: req.body.section,
        uid_owner: req.body.uid_owner,
        name_owner: req.body.name_owner,
        reviewers: req.body.reviewer,
        status: req.body.status,
        file: req.body.file,
    };

    // Save Tutorial in the database
    Capsules.create(capsules)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

exports.findAll = (req, res) => {

    Capsules.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Capsules.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: req.body
                });

            } else {
                res.send({
                    message: `Cannot update Capsules with id=${id}. Maybe Users was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Capsules with id=" + id
            });
        });
};