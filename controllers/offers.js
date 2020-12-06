const Offer = require('../models/offer');
const verfifcation = require('../verification');

exports.getOffers = async(req,res)=>{
    // we find the user 
    const idUser = req.user.id;
    const offers = await Offer.find({byIdUser: idUser});
    if(!offers) return res.status(400).send("there is no offer, please add one");
    res.status(200).send(offers);
};

exports.getOneOffer = async (req,res)=>{
    //get an offer by id 
    const offer = await Offer.findOne({_id: req.params.id});
    if (!offer) return res.status(400).send("no offer with that ID");
    res.status(200).send({
        message: "offer found successfully",
        offer: offer
    });
}

exports.addOffers = async(req,res)=>{
    const idUser = req.user.id;
    // we verify the inputs if they are not null 
    const errors = await verfifcation.validateOffer(req.body);
    if(errors) return res.status(400).send(errors.details[0].message);

    const newOffer = new Offer({
        byIdUser: idUser,
        ...req.body
    });
    const offerAdded = await newOffer.save();
    if(!offerAdded) return res.status(401).send("offer not added");

    res.status(401).send({
        message : "offer added successfully",
        offer : offerAdded
    })
};

exports.updateOffers = async(req,res)=>{
    const idUser = req.user.id;
    const errors = await verfifcation.validateOffer(req.body);
    Offer.updateOne({_id: req.params.id},{...req.body, date: Date.now()})
        .then((success)=>{
            res.status(201).send({
                message: req.params.id+ " has been updated successfully",
                details : success
            });
        })
        .catch((err)=>{
            res.status(401).send({
                message: req.params.id+ " has not been updated",
                error : err
            })
        })

}