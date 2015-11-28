'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/users', require('./users'));
router.use('/cameras', require('./cameras'));
router.use('/zones', require('./zones'));



// Make sure this is after all of
// the registered routes!

router.use(function (req, res) {
    res.status(404).end();
});
