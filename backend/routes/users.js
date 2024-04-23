let express = require('express');
let router = express.Router();


router.get('/hello', function(req, res) {
  res.send('respond with a resource');
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;
