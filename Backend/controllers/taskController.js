const asyncHandler = require('express-async-handler')

const Task = require('../models/taskModel')
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id })

    res.status(200).json(tasks)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setTask = asyncHandler(async (req, res) => {
    const { title, description, date, dateNumber, startTime, endTime } = req.body

    if (title === "") {
        res.status(400)
        throw new Error('Please add a title value')
    }
    // const done = false;
    const task = await Task.create({
        user: req.user.id,
        title,
        description,
        date,
        dateNumber,
        startTime,
        endTime,
        // done
    })

    res.status(200).json(task)
})

const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)

    Task.findByIdAndUpdate(req.params.uid, {
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
const updatePercent = asyncHandler(async (req, res) => {
    // const task = await Task.findById(req.params.id)
    console.log(req.body)
    const percentage = req.body;
    // const options = { new: true };
    Task.findByIdAndUpdate(req.params.uid, percentage, {
        new: true,
    })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err);
        });
    // Task.findByIdAndUpdate(req.params.uid,
    //     { percentage: "saba" },
    //     function (err, result) {
    //         if (err) {
    //             res.send(err)
    //         }
    //         else {
    //             res.send(result)
    //         }
    //     })
    // Task.findByIdAndUpdate(req.params.uid,
    //     {
    //         $set: { percentage: 'percentage' }
    //     }, { new: true }
    // )
    //     .then((data) => {
    //         res.status(200).json(data);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

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
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)

    if (!task) {
        res.status(400)
        throw new Error('Task not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (task.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await task.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getTasks,
    setTask,
    updateTask,
    updatePercent,
    deleteTask
}