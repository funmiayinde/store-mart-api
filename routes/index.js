var express = require('express');
var router = express.Router();
var sign_up_service = require("../services/SignUpClassService");
var store = require("../services/ShopService");
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/api/v1/sign_up',sign_up_service.create);
router.post('/api/v1/login',sign_up_service.do_login);
router.post('/api/v1/store',store.create);
router.get('/api/v1/store',store.get_all_shop);
router.get('/api/v1/store/:id',store.get_store_by_id);


module.exports = router;
