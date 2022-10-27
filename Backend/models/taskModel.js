const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        dateNumber: {
            type: Number,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        done: {
            type: Boolean,
            default: false,
        },
        percentage: {
            type: String,
            default: " "
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Task', taskSchema)