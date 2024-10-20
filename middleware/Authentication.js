const jwt = require('jsonwebtoken');
const secretKey = "shhh"

function verifyToken(req, res, next) {
  const token = req.cookies.authToken; 

  if (!token) {
    return res.status(403).send('Token is required');
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    
    req.user = decoded;
    
    next();  
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
}

module.exports = verifyToken;