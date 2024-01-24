var express = require('express');
var router = express.Router();
const { InvaildParam } = require('./error');


router.get("/", function (req, res, next) {
    if (Object.keys(req.query).length !== 0) {
        throw new InvaildParam(req.query, 400)
    }
    else {
        req.db.from('data').distinct("country").orderBy('country').pluck(`country`)
            .then((rows) => res.status(200).json(rows))
            .catch((err) => {
                console.log(err);
                res.status(500).json({ error: true, message: "Error in MySQL query" })
            }).catch(err => next(err))
    }
});

module.exports = router;