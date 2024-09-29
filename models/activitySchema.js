const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
    },
    ImageUrl: {
        type: String,
    },
    Organizer: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        required: true,
    },
    Description: {
        type: String,
    },
    Status: {
        type: String,
        enum: ['Completed', 'Incompleted'],
        default: 'Incompleted',
    },
    Type: {
        type: String,
        enum: ['Education', 'Health','Society','Environment','Innovation'],
        required: true,
    },
    Users_interested: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Refers to User model
    }]
}, { timestamps: true });

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
