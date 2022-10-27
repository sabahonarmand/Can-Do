const asyncHandler = require('express-async-handler')
const multer = require("multer");
let Goal = require('../models/goalModel')
const { v4: uuidv4 } = require('uuid');
const path = require('path');
var mongoose = require('mongoose');
const User = require('../models/userModel')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "../Frontend/my-app/public/uploads/");
    },
    filename: function (req, file, callback) {
        callback(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true)
    }
    else {
        cd(null, false);
    }
}

let upload = multer({ storage, fileFilter });
// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    // var objectId = mongoose.Types.ObjectId('630cc536e554f52fcc6b3970');
    const goals = await Goal.find()

    res.status(200).json(goals)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(upload.single("goalImg"), async (req, res) => {
    // const { title, description, date } = req.body
    // const goalImg = req.file.originalname
    const a = req.body.userid
    console.log(a)
    if (title === "") {
        res.status(400)
        throw new Error('Please add a title value')
    }
    const newGoal = new Goal({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        goalImg: req.file.originalname
    })
    newGoal
        .save()
        .then(() => res.json("New Goal posted!"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    // const done = false;
    // const goal = await Goal.create({
    //     user: req.user.id,
    //     title,
    //     description,
    //     date,
    //     goalImg
    // })

})

const updateGoal = asyncHandler(async (req, res) => {
    const Goal = await Goal.findById(req.params.id)

    Goal.findByIdAndUpdate(req.params.uid, {
        $set: { done: true },
    }, { new: true, useFindAndModify: false } //get updated result
    )
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err);
        });

})
// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
// const updateTask = asyncHandler(async (req, res) => {

//     // const task = await Task.findById(req.params.uid);

//     // if (!task) {
//     //     res.status(400)
//     //     throw new Error('Task not found')
//     // }

//     // // Check for user
//     // if (!req.user) {
//     //     res.status(401)
//     //     throw new Error('User not found')
//     // }

//     // // Make sure the logged in user matches the goal user
//     // if (task.user.toString() !== req.user.id) {
//     //     res.status(401)
//     //     throw new Error('User not authorized')
//     // }

//     const { title, description, date, startTime, endTime } = req.body
//     // const uptask = await Task.findByIdAndUpdate(req.params.uid,
//     //     {
//     //         user: req.user.id,
//     //         title,
//     //         description,
//     //         date,
//     //         startTime,
//     //         endTime,
//     //         done: true
//     //     }, { new: true });

//     // res.status(200).json(uptask);
//     const uptask = await Task.create({
//         user: req.user.id,
//         title,
//         description,
//         date,
//         startTime,
//         endTime,
//         done: true
//     })

//     res.status(200).json(uptask)
// })

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    await goal.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}