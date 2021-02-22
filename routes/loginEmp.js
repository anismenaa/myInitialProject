const router = require('express').Router();
const empCtrls = require('../controllers/loginUser.js');

router.get('/',empCtrls.getLoginEmp);
router.post('/',empCtrls.postLoginEmployee);

module.exports = router;