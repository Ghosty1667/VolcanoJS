var express = require('express');
var router = express.Router();


router.get("/", function (req, res, next) {
    const vaildPopulation = ['5km', '10km', '30km', '100km']

    const country = req.query.country
    const populatedWithin = req.query.populatedWithin


    if (!country) {
        res.status(400).json({ error: true, message: "Country is a required query parameter" })
        return
    }
    if (populatedWithin !== undefined && !vaildPopulation.includes(populatedWithin)) {
        res.status(400).json({ error: true, message: " Invalid value for populatedWithin. Only: 5km,10km,30km,100km are permitted." })
        return
    }

    req.db.from('data')
        .select('id', 'name', 'country', 'region', 'subregion')
        .where({ 'country': country })
        .modify(function (query) {
            if (populatedWithin !== undefined) {
                query.whereNot(`population_${populatedWithin}`, '=', '0')
            }
        })
        .then(row => res.status(200).json(row))
        .catch((err) => {
            console.log(err);
            res.json({ "Error": true, "Message": "Error executing MySQL query" })
        })
});
module.exports = router;