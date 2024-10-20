// routes/signup.js

const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // Import the User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.render('signup');
});

router.post('/', async (req, res) => {
    const { name, registrationNumber, phone, email, password } = req.body;

    if (!/^\d{8}$/.test(registrationNumber) || !/^\d{10}$/.test(phone)) {
        return res.send('Error: Registration number must be 8 digits and phone number must be 10 digits.');
    }

    if (!email.endsWith('@mnnit.ac.in')) {
        return res.send('Error: Email must end with @mnnit.ac.in');
    }

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.send('Error: Email already registered. Please use a different email or log in.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            registrationNumber: registrationNumber,
            phone: phone,
            email: email,
            password: hashedPassword
        });

        const secretKey = "shhh"
        const token = jwt.sign({ email: email }, secretKey, {
            expiresIn: '24h', 
        });
        res.cookie('authToken', token, {
            httpOnly: true, 
            secure: true,
            sameSite: 'strict',  
            maxAge: 24*3600000, 
        });

        await newUser.save();

        res.redirect('/main');
    } catch (err) {
        console.error(err);
        res.send('Error saving user: ' + err.message);
    }
});

module.exports = router;
