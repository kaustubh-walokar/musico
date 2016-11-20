var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    'bpm':'123',
    'genre':'345'
  });
});

module.exports = router;
