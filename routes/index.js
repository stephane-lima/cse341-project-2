const express = require("express");
const router = express.Router();

// router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    res.send("Welcome to cse341 project 2");
});

module.exports = router;