const express = require('express');
const {
    createActivity,
    updateActivity,
    autoUpdateCompletedActivities,
    addUserInterest,
    getUpcomingIncompletedActivities
} = require('../controllers/activityController');

const router = express.Router();

// Routes
router.post('/activities', createActivity); // Create a new activity
router.put('/activities/:id', updateActivity); // Update an existing activity
router.put('/activities/auto-update', autoUpdateCompletedActivities); // Auto-update incomplete activities
router.put('/activities/:activityId/interested', addUserInterest); // Add user interest
router.get('/activities/by-type', getActivitiesByType);
router.get('/activities/upcoming-incompleted', getUpcomingIncompletedActivities);

module.exports = router;

