const express = require("express");
const router = express.Router();
const vehicleController = require("../controller/vehicleController");

// Retrieve All Users
router.get("/", vehicleController.getAllVehicles);

// Retrieve Vehicle by Id
router.get("/:id", vehicleController.getSingleVehicle);

// Create New Vehicle
router.post("/", vehicleController.createVehicle);

// Update Vehicle
router.put("/:id", vehicleController.updateVehicle);

// Delete Vehicle
router.delete("/:id", vehicleController.deleteVehicle);

module.exports = router;