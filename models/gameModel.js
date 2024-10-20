const mongoose = require('mongoose');

// Schema for individual teams registering for the event
const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  members: {
    type: [Number], // Array of registration numbers
    required: true,
  },
  paymentLink: {
    type: String,
    required: true,
  }
});

const gameEventSchema = new mongoose.Schema({
  game: {
    type: String,
    required: true,
    enum: ['BattleGrounds Mobile India', 'Free Fire', 'Valorant', 'Mini Militia'], // Only these values allowed
  },
  date: {
    type: String,
    required: true,
    match: [/^\d{2}\/\d{2}\/\d{4}$/, 'Please enter the date in MM/DD/YYYY format'], // Ensures proper date format
  },
  time: {
    type: String,
    required: true,
    match: [/^(1[0-2]|0[1-9]):[0-5][0-9] (AM|PM)$/, 'Please enter the time in HH:MM AM/PM format'], // Ensures proper time format
  },
  organizer: {
    type: String,
    required: true,
  },
  entryFee: {
    type: Number,
    required: true,
    min: 0,
  },
  prizePool: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: true,
  },
  teamSize: {
    type: Number,
    required: true,
    min: 1,
  },
  teams: [teamSchema],
}, { timestamps: true });

const GameEvent = mongoose.model('GameEvent', gameEventSchema);

module.exports = GameEvent;
