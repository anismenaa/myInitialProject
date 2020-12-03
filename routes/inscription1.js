const router = require('express').Router();
const guestCtrl = require('../controllers/inscription1');

//post the full name and email and send him an email that contains 
router.post('/',guestCtrl.postGuest);

module.exports = router;