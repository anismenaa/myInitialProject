const router = require('express').Router();
const verifyAuth =  require('../middlewares/verifyAuth');
const profileCtrl = require('../controllers/profile');


router.get('/profile',verifyAuth,profileCtrl.getPorfile);
router.put('/profile',verifyAuth,profileCtrl.UpdateProfile);

module.exports= router;
