const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); 
const userModel = require('../models/userModel');
const GameEvent = require('../models/gameModel')

const secretKey = "shhh"; 

router.get('/', async (req, res) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(403).send('Token is required');
    }

    const decoded = jwt.verify(token, secretKey);

    const userEmail = decoded.email;

    const user = await userModel.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // const games = await GameEvent.find();
    // console.log(games)
    // console.log("Player Registration Number:", playerRegistrationNumber); // Ensure it's defined

    // games.forEach(game => {
    //   console.log("Teams in this game:", game.teams);
    //   game.teams.forEach(team => {
    //     console.log("Members of team:", team.teamName, team.members);
    //   });
    // }); 
    
    // console.log(gamesParticipatedIn)
      

    res.render('profile', {
      name: user.name,
      email: user.email,
      registrationNumber: user.registrationNumber,
      phone: user.phone
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
