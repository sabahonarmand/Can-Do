const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const {
    getTasks,
    setTask,
    updateTask,
    updatePercent,
    deleteTask,
} = require('../controllers/taskController');

router.route('/').get(protect, getTasks).post(protect, setTask);
router.route('/update/:uid').post(updateTask);
router.route('/updatePercent/:uid').post(updatePercent);
router.route('/:id').delete(protect, deleteTask);
// router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)
// router.route('/').get(protect, asyncHandler(async (req, res) => {
//     const tasks = await Task.find({ user: req.user.id })

//     res.status(200).json(tasks)
// })).post(protect, asyncHandler(async (req, res) => {
//     const { title, description, date, startTime, endTime } = req.body

//     if (title === "") {
//         res.status(400)
//         throw new Error('Please add a title value')
//     }

//     const task = await Task.create({
//         user: req.user.id,
//         title,
//         description,
//         date,
//         startTime,
//         endTime
//     })

//     res.status(200).json(task)
// }));
// router.route('/:id').delete(protect, asyncHandler(async (req, res) => {
//     const task = await Task.findById(req.params.id)

//     if (!task) {
//         res.status(400)
//         throw new Error('Task not found')
//     }

//     // Check for user
//     if (!req.user) {
//         res.status(401)
//         throw new Error('User not found')
//     }

//     // Make sure the logged in user matches the goal user
//     if (Task.user.toString() !== req.user.id) {
//         res.status(401)
//         throw new Error('User not authorized')
//     }

//     await Task.remove()

//     res.status(200).json({ id: req.params.id })
// }));

module.exports = router