const express = require('express');
const {
    createActivity,
    updateActivity,
    autoUpdateCompletedActivities,
    addUserInterest,
    getUpcomingIncompletedActivities,
    getActivitiesByType

} = require('../controllers/activityController');

const router = express.Router();

// Routes
router.post('/activities/create', createActivity); // Create a new activity
router.put('/activities/update/:id', updateActivity); // Update an existing activity
router.put('/activities/auto-update', autoUpdateCompletedActivities); // Auto-update incomplete activities
router.put('/activities/:activityId/interested', addUserInterest); // Add user interest
router.get('/activities/:type', getActivitiesByType);
router.get('/activities/filter/upcoming-incompleted', getUpcomingIncompletedActivities);

module.exports = router;


