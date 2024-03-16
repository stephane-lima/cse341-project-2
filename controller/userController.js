const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllUsers = async (req, res) => {
    //#swagger.tags=["Users"]
    //#swagger.summary= Returns all users
    const result = await mongodb.getDatabase().db().collection("users").find();
    result.toArray().then((users) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users);
    }).catch((err) => {
        res.status(400).json({ message: err });
    });
    // result.toArray((err, users) => {
    //     if (err) {
    //         res.status(400).json({ message: err });
    //     }
//         res.setHeader("Content-Type", "application/json");
//         res.status(200).json(users);
//     });
};

const getSingleUser = async (req, res) => {
    //#swagger.tags=["Users"]
    //#swagger.summary = Returns a user by ID
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid user id to find a user.");
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("users").find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users[0]);
    }).catch((err) => {
        res.status(400).json({ message: err });
    });
    // result.toArray((err, users) => {
    //     if (err) {
    //         res.status(400).json({ message: err });
    //     }
    //     res.setHeader("Content-Type", "application/json");
    //     res.status(200).json(users[0]);
    // });
};

const createUser = async (req, res) => {
    //#swagger.tags=["Users"]
    //#swagger.summary = Create a new user
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };
    const response = await mongodb.getDatabase().db().collection("users").insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while creating the user");
    }
}

const updateUser = async (req, res) => {
    //#swagger.tags=["Users"]
    //#swagger.summary = Updates an existing user
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid user id to update a user");
    }
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }
    const response = await mongodb.getDatabase().db().collection("users").replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while updating a user.");
    }
}

const deleteUser = async (req, res) => {
    //#swagger.tags=["Users"]
    //#swagger.summary = Deletes an existing user
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid user id to delete a user.");
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("users").deleteOne({ _id: userId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while deleting a user.")
    }
}

module.exports = { getAllUsers, getSingleUser, createUser, updateUser, deleteUser }