const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
            // ref: 'User',
        },
        title: {
            type: String,
            // required: true,
        },
        description: {
            type: String,
            // required: true,
        },
        date: {
            type: String,
            // required: true,
        },
        goalImg: {
            type: String
        },
        done: {
            type: Boolean,
            default: false,
        }
    },
    // {
    //     timestamps: true,
    // }
);

module.exports = mongoose.model('Goal', goalSchema)