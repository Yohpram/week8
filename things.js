var express = require('express');
var router = express.Router();

router.get('/:name', function (req, res) {
    res.send('hello rakamin' + req.params.name) 
});

module.exports = router


