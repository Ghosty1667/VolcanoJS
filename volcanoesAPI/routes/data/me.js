var express = require('express');
var router = express.Router();

router.get("/", function (req, res, next) {
    res.json({
        name: "Kieran Price",
        student_number: "n11252600"
    })
});

module.exports = router;