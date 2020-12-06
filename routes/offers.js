const router = require('express').Router();
const offersCtrl = require('../controllers/offers');
const verifyAuth =  require('../middlewares/verifyAuth');

/* to do list :
    the photograph may 
    -add an offer 
        each offer contains :type (wedding photos , porteries , video clip (no music), advertisements for the  ) , title , description , price 
    -deleting ( and then sending a message for the user who clicked on the offer "this offer was deleted")

*/
router.get('/',verifyAuth,offersCtrl.getOffers);
router.get('/:id',verifyAuth,offersCtrl.getOneOffer);
router.post('/add',verifyAuth,offersCtrl.addOffers);
router.put('/update/:id',verifyAuth,offersCtrl.updateOffers);


module.exports = router ;