const express = require("express");
const router = express.Router();


//INDEX ROUTE
router.get("/", (req, res) =>{
    res.send("GET for posts");
});

//SHOW ROUTE - users
router.get("/:id", (req, res) =>{
    res.send("GET for post id");
});

//POST ROUTE - users
router.post("/", (req, res) =>{
    res.send("POST for posts");
});

//DELETE ROUTE - users
router.delete("/:id", (req, res) =>{
    res.send("DELETE for post id");
});

module.exports = router;