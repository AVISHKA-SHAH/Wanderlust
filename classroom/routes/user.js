const express = require("express");
const router = express.Router();

//INDEX ROUTES
router.get("/", (req, res) => {
    res.send("GET for users");
});

//SHOW ROUTE - users
router.get("/:id", (req, res) => {
    res.send("GET for user id");
});

//POST ROUTE - users
router.post("/", (req, res) => {
    res.send("DELETE for users");
});

//DELETE ROUTE - users
router.delete("/:id", (req, res) => {
    res.send("DELETE for user id");
});

module.exports = router;