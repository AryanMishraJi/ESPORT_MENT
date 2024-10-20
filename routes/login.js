const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email});
        if (!user) {  
            return res.send('Error: Invalid email or password.');
        } 

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send('Error: Invalid email or password.');
        }
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

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.send('Error logging in: ' + err.message);
    }
});


module.exports = router;
