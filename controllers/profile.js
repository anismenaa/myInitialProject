const User = require('../models/user');


exports.getPorfile=(req,res)=>{
   // we get the id
   const idUser = req.user.id;
   User.findOne({_id : idUser})
    .then((dataUser)=>{
        res.status(200).render('../views/profileEmp');
    })
    .catch((err)=>{
        res.status(400).send({
            error: err
        })
    })
}

// updating the profile
exports.UpdateProfile = async(req,res)=>{
    const idUser= req.user.id;
    const updates = req.body;
    console.log(updates);
    
    User.updateOne({_id: idUser},{...updates}) // we updates only the fields that were changed by the user 
        .then(async(user)=>{
            res.status(201).send(user);
            const findUser =await User.findOne({_id: idUser});
            console.log(findUser);
        })
        .catch((err)=>{
            res.status(401).send({
                message : "user not updated",
                error : err
            })
        })
}