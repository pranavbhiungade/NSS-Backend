const Activity = require('../models/activitySchema');
const User = require('../models/userSchema');
const Admin = require('../models/adminSchema');

// Controller to create a new activity
exports.createActivity = async (req, res) => {
    try {
        const { Title, ImageUrl, Organizer, Date, Description, Status, Type } = req.body;

        const newActivity = new Activity({
            Title,
            ImageUrl,
            Organizer,
            Date,
            Description,
            Status: Status || 'Incompleted', // Default to Incompleted if not provided
            Type,
        });

        const savedActivity = await newActivity.save();
        res.status(201).json(savedActivity);
    } catch (error) {
        res.status(500).json({ message: 'Error creating activity', error });
    }
};

// Controller to update an existing activity
exports.updateActivity = async (req, res) => {
    try {
        const activityId = req.params.id;
        const updates = req.body;

        const updatedActivity = await Activity.findByIdAndUpdate(activityId, updates, { new: true });

        if (!updatedActivity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        res.status(200).json(updatedActivity);
    } catch (error) {
        res.status(500).json({ message: 'Error updating activity', error });
    }
};

exports.autoUpdateCompletedActivities = async (req, res) => {
    try {
        const currentDate = new Date();

        // Find activities that are incompleted and whose date has passed
        const activitiesToUpdate = await Activity.find({
            Status: 'Incompleted',
            Date: { $lt: currentDate }
        });

        if (activitiesToUpdate.length === 0) {
            return res.status(200).json({ message: 'No activities to update' });
        }

        // Update all found activities to Completed
        await Activity.updateMany(
            { Status: 'Incompleted', Date: { $lt: currentDate } },
            { $set: { Status: 'Completed' } }
        );

        res.status(200).json({ message: 'All outdated incompleted activities have been updated to completed' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating activities', error });
    }
};

exports.addUserInterest = async (req, res) => {
    try {
        const { activityId } = req.params;
        const { userId } = req.body; // Assuming user ID is passed in the body

        // Find the activity and update the Users_interested array if the user is not already interested
        const activity = await Activity.findById(activityId);

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        if (activity.Users_interested.includes(userId)) {
            return res.status(400).json({ message: 'User already marked as interested' });
        }

        activity.Users_interested.push(userId);
        await activity.save();

        res.status(200).json({ message: 'User interest added successfully', activity });
    } catch (error) {
        res.status(500).json({ message: 'Error adding user interest', error });
    }
};
// Controller to retrieve activities by type
exports.getActivitiesByType = async (req, res) => {
    try {
        // Assuming the type is passed as a query parameter
        const { type } = req.params;
        const status = "Completed";

        if (!type) {
            return res.status(400).json({ message: 'Activity type is required' });
        }

        // Query the database for activities of the given type
        const activities = await Activity.find({ Type: type,Status:status });

        // Return the activities
        if (activities.length === 0) {
            return res.status(404).json({ message: 'No activities found for this type' });
        }

        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving activities', error });
    }
};

exports.getUpcomingIncompletedActivities = async (req, res) => {
    try {
        const currentDate = new Date();

        // Query to find activities where the date is in the future and status is "Incompleted"
        const upcomingActivities = await Activity.find({     // Date is greater than the current date
            
            Status:"Incompleted",           // Activity is still incompleted
        });

        // Check if there are any upcoming incompleted activities
        if (upcomingActivities.length === 0) {
            return res.status(404).json({ message: 'No upcoming incompleted activities found' });
        }

        res.status(200).json(upcomingActivities);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving upcoming activities', error });
    }
};


