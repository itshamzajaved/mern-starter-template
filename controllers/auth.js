const { userModel, logsModel } = require('../database/models.js')
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const loginUser = (req, res) => {
    if (!req.body.email) {
        res.json({
            "info": true,
            "message": "Email is Required"
        })
    }else if (!req.body.password) {
        res.json({
            "info": true,
            "message": "Password is Required"
        })
    }else {
        userModel.findOne({email: req.body.email}, (err,user) => {
            if (err) console.log(err);
            if (user == null) {
                res.json({
                    "info": true,
                    "message": "Invalid Email or Password!"
                })
            }else {
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if (err) console.error(err);
                    if (result) {
                        jwt.sign({_id: user._id, exp: Math.floor(Date.now() / 1000) + (200 * 60)},config.get('jwtSecret'), (err,token) => {
                            if (err) console.log(err);
                            if (token) {
                                res.status(200).json({
                                    "success": true,
                                    "message": "Login Successfull",
                                    "token": token,
                                    "name": user.name,
                                    "email": user.email
                                });
                            }
                        })
                    } else {
                        res.json({
                            "info": true,
                            "message": "Invalid Email or Password"
                        })
                    }
                });
            }
        })
    }
}



const registerUser = async (req, res) => {
    if (!req.body.fname) {
        res.json({
            "info": true,
            "message": "First Name is Required"
        });
    }else if (!req.body.lname) {
        res.json({
            "info": true,
            "message": "Last Name is Required"
        })
    }else if (!req.body.email) {
        res.json({
            "info": true,
            "message": "Email is Required"
        })
    }else if (!req.body.password) {
        res.json({
            "info": true,
            "message": "Password is Required"
        })
    }else if (!req.body.username) {
        res.json({
            "info": true,
            "message": "Username is Required"
        })
    }else {
        userModel.findOne({email: req.body.email}, (err,result) => {
            if (result != null) {
                res.json({
                    "info": true,
                    "message": "Email is Already Exists"
                })
            }else {
                bcrypt.genSalt(8, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        if (err) console.log(err);
                        const user = {
                            "fname": req.body.fname,
                            "lname": req.body.lname,
                            "email": req.body.email,
                            "password": hash,
                            "username": req.body.username,
                        }
                        const storeUser = new userModel(user);
                        const result = storeUser.save();
                        if (result != null) {
                            result.then((user) => {
                                jwt.sign({_id: user._id, exp: Math.floor(Date.now() / 1000) + (200 * 60)}, config.get('jwtSecret'), (err,token) => {
                                    if (err) console.log(err);
                                    const storeLog = new logsModel({ message: `New User Signup with Email "${user.email}".`, user: user._id, log_type: "signup" })
                                    const logsResult = storeLog.save();
                                    
                                    if (token && logsResult != null) {
                                        res.json({
                                            "success": true,
                                            "message": "User Register Successfull",
                                            "token": token,
                                            "username": user.username,
                                            "email": user.email
                                        })
                                    }
                                })
                            });
                        }else {
                            res.json({
                                "error": true,
                                "message": "Some Went Wrong"
                            })
                        }
                    });
                });
            }
        })
        
    }
}


module.exports = {
    onLoginUser: async (req, res) => loginUser(req, res),
    onRegisterUser: async (req, res) => { registerUser(req, res) },
}