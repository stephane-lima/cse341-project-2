const express = require("express");
const router = express.Router();
const userRoute = require("./users");
const vehicleRoute = require("./vehicles");

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    //#swagger.tags=["Homepage"]
    //#swagger.summary = Returns Welcome to cse341 project 2
    res.send("Welcome to cse341 project 2");
});

router.use("/users", userRoute);
router.use("/vehicles", vehicleRoute);

module.exports = router;