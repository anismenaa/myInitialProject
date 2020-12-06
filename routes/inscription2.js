const router = require('express').Router();
const inscription2Ctrl = require('../controllers/inscription2');7



router.get('/guest/:id',inscription2Ctrl.getInscription2);

router.post('/guest/:id',inscription2Ctrl.postRegister);

router.post('/loginEmployee',inscription2Ctrl.postLoginEmployee);


module.exports = router;

