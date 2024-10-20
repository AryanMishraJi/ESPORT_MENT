const express = require('express');
const router = express.Router();
const Owner = require('../models/ownermodel'); 
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.render('owner');
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const newOwner = await Owner.findOne({ email: email});
        if (!newOwner) { 
            const newerOwner = new Owner({
                email,
                password
            });
    
            await newerOwner.save();
        }

        else{
            const isMatch = await bcrypt.compare(password, newOwner.password);
            if (!isMatch) {
                return res.send('Error: Invalid email or password.');
            }
        }

        res.redirect('/create');
    } catch (err) {
        console.error(err);
        res.send('Error logging in: ' + err.message);
    }
});


module.exports = router;
