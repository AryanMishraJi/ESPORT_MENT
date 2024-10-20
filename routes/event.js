const express = require('express');
const router = express.Router();
const Event = require('../models/gameModel');

const app = express();

router.get('/:eventId', async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);

      if (!event) {
        return res.status(404).send('Event not found');
      }
      res.render('eventDetail', { event }); 
    } catch (err) {
      res.status(500).send('Server Error');
    }
  });
  
  module.exports = router;