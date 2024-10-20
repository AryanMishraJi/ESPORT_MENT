const express = require('express');
const mongoose = require('mongoose');
const GameEvent = require('../models/gameModel'); 
const User = require('../models/userModel');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.get('/:eventId', async (req, res) => {
    const eventId = req.params.eventId;
  
    try {
        const event = await GameEvent.findById(eventId);
  
        if (!event) {
            return res.status(404).send('Game not found');
        }
        res.render('registration', { event });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
  });

router.post('/:eventId', async (req, res) => {
  const eventId = req.params.eventId;
  const { teamName, members, paymentLink, confirmRegistration } = req.body;

  if (!confirmRegistration) {
    return res.status(400).send('Please confirm the registration.');
  }

  try {
    const event = await GameEvent.findById(eventId);
    if (!event) {
      return res.status(404).send('Event not found.');
    }

    const foundMembers = await User.find({ registrationNumber: { $in: members } });

    if (foundMembers.length !== members.length) {
      return res.status(400).send('Some registration numbers were not found.');
    }

    event.teams.push({
      teamName,
      members,
      paymentLink
    });

    await event.save();

    res.send('Registered Successfully!');
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
});

module.exports = router