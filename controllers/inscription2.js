const Guest = require('../models/guest');
const User = require('../models/user');
const validation = require('../verification');
const bcrypt = require('bcryptjs');

exports.getInscription2 = (req,res)=>{ 
        Guest.findOne({_id: req.params.id})
            .then((guest)=>{
                res.status(200).send(guest);
            })
            .catch((err)=>{
                res.status(400).send({
                    message:'error',
                    error: err
                })
            })
};

exports.postRegister = async(req,res)=>{
    // validate the req.body
    const pwdConfirmation = req.body.pwdConfirmation; // with the password confirmation 
    delete req.body.pwdConfirmation;
    //recuperer l'email 
    const userEmail = (await Guest.findOne({_id: req.params.id})).email; // we got the email from the guest 
    const notValidate = validation.validateInscription2(req.body); 
    if(notValidate) return res.status(400).send(notValidate.details[0].message);
    // verify what if the email exists 
    const userExist = await User.findOne({email: userEmail});
    if(userExist) return res.status(400).send('you are already registred'); 

    if (req.body.password !== pwdConfirmation) return res.status(400).send('passwords does not match');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    const newUser = new User({
        email: userEmail,
        ...req.body,
        password: hashedPassword
    });
    const userSaved = await newUser.save();
    if(!userSaved) return res.status(401).send('user not saved');
    Guest.updateOne({_id: req.params.id},{ registered: true })
        .then(()=>{
            res.status(201).send('everything is cool ');
        })
        .catch((error)=>{
            res.status(400).send({
                message:'the registered item in Guest was not updated',
                error : error
            })
        });
    
        
    // if all the information are valide we confirme the password
   
}
