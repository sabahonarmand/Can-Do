const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')

const multer = require("multer");
let Goal = require('../models/goalModel')
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const User = require('../models/userModel')

const { protect } = require('../middleware/authMiddleware');
const {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
} = require('../controllers/goalController');

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
router.route('/').get((getGoals)).post(upload.single("goalImg"), (req, res) => {
    const newGoal = new Goal({
        user: req.body.userid,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        goalImg: req.file.filename
    })
    newGoal
        .save()
        .then(() => res.json("New Goal posted!"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
})
router.route('/update/:uid').post(updateGoal);
router.route('/:id').delete(deleteGoal);

module.exports = router