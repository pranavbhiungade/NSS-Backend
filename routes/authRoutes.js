const express = require('express');

const { createUser, createAdmin } = require('../controllers/userAdminController');

const router = express.Router(); 

router.post('/users', createUser);
router.post('/admins', createAdmin);

module.exports = router;