const express = require('express');
const router = express.Router();
const GameEvent = require('../models/gameModel');

router.get('/', (req, res) => {
    res.render('creategame');
});

router.post('/', async (req, res) => {
  try {
    const { game, date, time, organizer, teamSize, entry_fee, prizepool, image } = req.body;

    const newEvent = new GameEvent({
      game,
      date,
      time,
      organizer,
      teamSize,
      entryFee: entry_fee,
      prizePool: prizepool,
      image 
    });

    await newEvent.save();

    res.redirect('/create');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error submitting event');
  }
});

module.exports = router;
