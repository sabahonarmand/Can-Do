const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { protect } = require('../middleware/authMiddleware');

// @desc   Register new user
//@route   Post /api/users
//@access  Public
router.post('/', asyncHandler(async (req, res) => {

    //Check if user is exists
    const userExists = await User.findOne(({ email: req.body.email }))
    if (userExists) {
        res.status(400);
        res.status(400).send({ message: 'User already exists!' })
        // throw new Error('User already exists!')
    };

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //Create user
    const user = await User.create({ ...req.body, password: hashedPassword })

    if (user) {
        res.status(201).json({
            token: generateToken(user._id)
        });
        // const token = generateToken(user._id);
        // res.status(200).send({ data: token });
    } else {
        // res.status(400).send({ message: 'Invalid user data!' })
        res.status(400);
        // throw new Error('Invalid user data!');
        res.status(400).send({ message: 'Invalid user data!' })

    }
}));

// @desc   Authenticate a user
//@route   Post /api/users/login
//@access  Public
router.post('/login', asyncHandler(async (req, res) => {

    //Check for the user email
    const user = await User.findOne({ email: req.body.email });

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
        res.status(201).json({
            user_id: user._id,
            token: generateToken(user._id)
        });
        // res.status(201).json({
        //     user_id: user._id,

        // });
        // const token = user.generateAuthToken();
        // res.status(200).send({ data: token, message: "logged in successfully" });
    } else {
        // res.status(400).send({ message: 'Invalid user data!' })
        res.status(400);
        throw new Error('Invalid credentials!')
    };
}));

// @desc   Get user data
//@route   Get /api/users/me
//@access  Privete
router.get('/me', protect, asyncHandler(async (req, res) => {
    // const { _id, name, email } = await User.findById(req.user.id);
    res.status(200).json(req.user)
}));

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
module.exports = router