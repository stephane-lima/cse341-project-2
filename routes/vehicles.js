const express = require("express");
const router = express.Router();
const vehicleController = require("../controller/vehicleController");
const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

// Retrieve All Users
router.get("/", vehicleController.getAllVehicles);

// Retrieve Vehicle by Id
router.get("/:id", vehicleController.getSingleVehicle);

// Create New Vehicle
router.post("/", isAuthenticated, validation.validateVehicle, vehicleController.createVehicle);

// Update Vehicle
router.put("/:id", isAuthenticated, validation.validateVehicle, vehicleController.updateVehicle);

// Delete Vehicle
router.delete("/:id", isAuthenticated, vehicleController.deleteVehicle);

module.exports = router;