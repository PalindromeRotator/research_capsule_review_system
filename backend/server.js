const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "https://research-capsule-review-system.vercel.app"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/users.routes")(app);
require("./app/routes/capsules.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
const PORT_CAPSULE = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
app.listen(PORT_CAPSULE, () => {
    console.log(`Server is running on port ${PORT_CAPSULE}.`);
});