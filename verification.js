const Joi = require('@hapi/joi');
// for the inscription 1
const VerificationSchema = Joi.object({
    fullName : Joi.string()
        .min(4)
        .max(255)
        .required(),

    email : Joi.string()
        .email()
        .min(6)
        .max(255)
        .required()
}); 


// for the inscription 2
const inscription2Schema = Joi.object({
    familyName: Joi.string()
        .min(4)
        .max(255)
        .required(),

    surName: Joi.string()
        .min(4)
        .max(255)
        .required(),

    birthday: Joi.date()
        .required(),

    nationality: Joi.string()
        .required(),

    password: Joi.string()
        .min(6)
        .max(15)
        .required(),

    instagramLink: Joi.string()
        .required(),
    DriveLink: Joi.string()
        .required(),
})




exports.verifyInfo = (data)=>{
    const {error}=VerificationSchema.validate(data);
    return error;
}

exports.validateInscription2 = (data)=>{
    const {error}=inscription2Schema.validate(data);
    return error;
}
