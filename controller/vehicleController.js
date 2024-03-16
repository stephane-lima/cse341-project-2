const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllVehicles = async (req, res) => {
    //#swagger.tags=["Vehicles"]
    //#swaggger.summary = Retrieve all vehicles
    const result = await mongodb.getDatabase().db().collection("vehicles").find();
    // result.toArray((err, vehicles) => {
    //     if (err) {
    //         res.status(400).json({ message: err });
    //     }
    //     res.setHeader("Content-Type", "application/json");
    //     res.status(200).json(vehicles);
    // });
    result.toArray().then((vehicles) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(vehicles);
    }).catch((err) => {
        res.status(400).json({ message: err });
    });
};

const getSingleVehicle = async (req, res) => {
    //#swagger.tags=["Vehicles"]
    //#swaggger.summary = Retrieve a vehicle by ID
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid vehicle id to find a vehicle");
    }
    const vehicleId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("vehicles").find({ _id: vehicleId });
    // result.toArray((err, vehicles) => {
    //     if (err) {
    //         res.status(400).json({ message: err });
    //     }
    //     res.setHeader("Content-Type", "application/json");
    //     res.status(200).json(vehicles);
    // });
    result.toArray().then((vehicles) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(vehicles[0]);
    }).catch((err) => {
        res.status(400).json({ message: err });
    });
};

const createVehicle = async (req, res) => {
    //#swagger.tags=["Vehicles"]
    //#swaggger.summary = Creates a new vehicle
    const vehicle = {
        make: req.body.make,
        model: req.body.model,
        type: req.body.type,
        price: req.body.price,
        year: req.body.year,
        miles: req.body.miles,
        color: req.body.color
    }
    const response = await mongodb.getDatabase().db().collection("vehicles").insertOne(vehicle);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while creating a new vehicle");
    }
}

const updateVehicle = async (req, res) => {
    //#swagger.tags=["Vehicles"]
    //#swaggger.summary = Updates an existing vehicle
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid vehicle id to update a vehicle");
    }
    const vehicleId = new ObjectId(req.params.id);
    const vehicle = {
        make: req.body.make,
        model: req.body.model,
        type: req.body.type,
        price: req.body.price,
        year: req.body.year,
        miles: req.body.miles,
        color: req.body.color
    };
    const response = await mongodb.getDatabase().db().collection("vehicles").replaceOne({ _id: vehicleId }, vehicle);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while updating a vehicle.")
    }
}

const deleteVehicle = async (req, res) => {
    //#swagger.tags=["Vehicles"]
    //#swaggger.summary = Deletes an existing vehicle
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid vehicle id to delete a vehicle.");
    }
    const vehicleId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("vehicles").deleteOne({ _id: vehicleId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while deleting a vehicle");
    }
}

module.exports = { getAllVehicles, getSingleVehicle, createVehicle, updateVehicle, deleteVehicle }