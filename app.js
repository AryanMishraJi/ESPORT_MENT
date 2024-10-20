const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const authenticate = require('./middleware/Authentication'); 

const mongoURI = 'mongodb://localhost:27017/EsportMent';
const app = express();
const PORT = 3000;

const loginRoute = require('./routes/login');
const signinRoute = require('./routes/signup');
const owner = require('./routes/owner');
const createGame = require('./routes/creategame');
const GameDetail = require('./routes/event');
const profilePage = require('./routes/profile');
const registerGame = require('./routes/registration');
const GameEvent = require('./models/gameModel')
const checkAuthToken = require('./middleware/checkAuthToken')

mongoose.connect(mongoURI).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/',async (req, res) => {
  try {
    const events = await GameEvent.find(); 
    const authToken = req.cookies.authToken;
    res.render('home', { events, authToken }); 
  } catch (err) {
    res.status(500).send('Error fetching events');
  }
});

app.use('/login', loginRoute);
app.use('/signup', signinRoute);
app.post('/logout', (req, res) => {
  res.clearCookie('authToken'); 
  res.status(200).send('Logged out successfully'); 
});
 
app.use('/event', authenticate, GameDetail);
app.use('/register', authenticate, registerGame);
app.use('/profile', authenticate, profilePage);

app.use('/owner', owner);
app.use('/create', createGame);

app.listen(PORT, () => {
    console.log(`The port is running on http://localhost:${PORT}`);
});
