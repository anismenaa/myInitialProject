const router = require('express').Router();
const inscription2Ctrl = require('../controllers/inscription2');


router.get('/:id',inscription2Ctrl.getInscription2);

router.post('/:id',inscription2Ctrl.postRegister);


module.exports = router;

