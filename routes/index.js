var express = require('express');
var router = express.Router();
var sign_up_service = require("../services/SignUpClassService")
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/api/v1/sign_up',sign_up_service.create);
router.post('/api/v1/login',sign_up_service.do_login);


module.exports = router;
