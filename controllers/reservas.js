var express = require('express');
var router = express.Router();
const reservasM = require('../models/reservasModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({});
});

module.exports = router;
