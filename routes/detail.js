const express = require('express');
const router = express.Router();
const Event = require('../models/gameModel');

router.get('/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);
    res.render('EventDetail', { event }); 
  } catch (err) {
    res.status(500).send('Error fetching events');
  }
});

module.exports = router;