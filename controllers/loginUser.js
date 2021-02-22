const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validation = require('../verification');
const User = require('../models/user');

exports.getLoginEmp = (req,res)=>{
    res.status(200).render('../views/loginEmp');
}


exports.postLoginEmployee = async (req,res,next)=>{
    // verify the inputs
    console.log(req.body);

    const userNotValidate = validation.validateLogins(req.body);
    if(userNotValidate) return res.status(400).send(userNotValidate.details[0].message);
    // if the  inputs are good then we verify if the email exist 
    const userFound = await User.findOne({email: req.body.email});
    if(!userFound) return res.status(401).send({errorMessage:"this email does not exist, please  go and register"});
    // if the email exists we verify the password
    if(! await bcrypt.compare(req.body.password,userFound.password)) return res.status(400).send({errorMessage:"false password"});
    userFound.connected = true;
    
    const payload = {id: userFound._id};
    let accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{
        algorithm:"HS256"
    });
    res.setHeader('auth-token',accessToken);

    res.redirect('/user');
}