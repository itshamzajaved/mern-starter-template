const jwt = require('jsonwebtoken');
const config = require('config');
const {userModel} = require('../database/models');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
      return res.status(401).json({
          "error": true,
          "message": "Authentication Failed"
      })
    }else {
      jwt.verify(token, config.get('jwtSecret'), (err, user) => {
        if (err) console.log(err);
        userModel.findOne({_id: user._id}, (err, user) => {
          if (user != null) {
            req.user = user;
            next()
          }else {
            return res.json({
              "jwt": true,
              "message": "Authentication Failed"
            })
          }
        })
    
      })
  }
}

module.exports = authenticateToken;