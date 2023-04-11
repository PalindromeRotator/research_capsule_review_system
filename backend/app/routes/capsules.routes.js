module.exports = capsule => {
    const capsules = require("../controllers/capsules.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", capsules.create);

    // // Retrieve all Tutorials
    router.get("/", capsules.findAll);
    // router.get("/faculty", users.findAllFaculty);

    // // // Retrieve all published Tutorials
    // // router.get("/published", tutorials.findAllPublished);

    // // // Retrieve a single Tutorial with id
    // router.get("/:email/:password", users.findOne);
    // router.get("/:id", users.findById);

    // // // Update a Tutorial with id
    router.put("/:id", capsules.update);

    // // // Delete a Tutorial with id
    // // router.delete("/:id", tutorials.delete);

    // // // Delete all Tutorials
    // // router.delete("/", tutorials.deleteAll);

    capsule.use('/api/capsules', router);
};