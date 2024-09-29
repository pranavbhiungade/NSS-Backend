const bcrypt = require('bcryptjs');
const User = require('../models/userSchema');

// Controller to create a new User
exports.createUser = async (req, res) => {
    try {
        const { StudentID, Name, Branch, Year, password } = req.body;

        // Check if all required fields are present
        if (!StudentID || !Name || !Branch || !Year || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ StudentID });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this Student ID already exists' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object
        const newUser = new User({
            StudentID,
            Name,
            Branch,
            Year,
            password: hashedPassword, // Store hashed password
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

exports.createAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if both fields are present
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Check if the admin already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this username already exists' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new admin object
        const newAdmin = new Admin({
            username,
            password: hashedPassword, // Store hashed password
        });

        // Save the admin to the database
        await newAdmin.save();

        res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Error creating admin', error });
    }
};