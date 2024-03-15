const validator = require("../helpers/validate");

const validateUser = (req, res, next) => {
    const validationRules = {
        firstName: "required|string",
        lastName: "required|string",
        email: "required|email",
        password: "required|string"
    };
    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const validateVehicle = (req, res, next) => {
    const validationRules = {
        make: "required|string",
        model: "required|string",
        type: "required|string",
        price: "required|numeric",
        year: "required|numeric|between:1885,2024",
        miles: "required|integer|min:0",
        color: "required|string",
    };
    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            })
        } else {
            next();
        }
    });
};

module.exports = { validateUser, validateVehicle };