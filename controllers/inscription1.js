

const validation = require('../verification');
const Guest = require('../models/guest');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();


exports.postGuest=async(req,res)=>{
    // recuperer l'email et le nom complet et le verifier
    const notValide = validation.verifyInfo(req.body);
    if(notValide) return res.status(400).send(notValide.details[0].message);
    //on lui envoie un email de redirection vers apply section
    const guest = new Guest({
        ...req.body,
        registered: false
    });
    const tranporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth:{
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
        },
        tls:{
            rejectUnauthorized:false
        }
    });
    // verify what if the email already exist 
    const emailExist = await Guest.findOne({email: req.body.email});
    if(emailExist) {
        const messageOptions = {
            from: "ha_menaa@esi.dz",
            to: req.body.email,
            subject: "here your redirection",
            text: "http://localhost:3000/guest/"+emailExist._id,
        };
        tranporter.sendMail(messageOptions,(err,info)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(201).send("you are aleady a guest , please recheck you email ");
            }
        });
    }else{
        guest.save()
        .then((guest)=>{
            const messageOptions = {
                from: "ha_menaa@esi.dz",
                to: req.body.email,
                subject: "here your redirection",
                text: "http://localhost:3000/guest/"+guest._id,
            };
            tranporter.sendMail(messageOptions,(err,info)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(201).send(info.messageId);
                }
            });
        })
        .catch((error)=>{
           res.status(401).send(error);
        });    
    }
    

}