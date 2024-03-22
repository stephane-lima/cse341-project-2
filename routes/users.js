const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

// Retrieve All Users
router.get("/", userController.getAllUsers);

// Retrieve User by Id
router.get("/:id", userController.getSingleUser);

// Create New User
router.post("/", isAuthenticated, validation.validateUser, userController.createUser);

// Update User
router.put("/:id", isAuthenticated, validation.validateUser, userController.updateUser);

// Delete User
router.delete("/:id", isAuthenticated, userController.deleteUser);

module.exports = router;