var express = require('express');
var router = express.Router();
const optionalAuth = require('./authorization');
const { VolcanoNotFound, IDNotFound } = require('./error');

router.get('/:id(\\d+)/', optionalAuth, function (req, res, next) {
    if (req.params.id === undefined) {
        throw new IDNotFound(req.route, req.params.id, 400)
    }
    else {
        req.db.from('data')
            .first('id', 'name', 'country', 'region', 'subregion', 'last_eruption', 'summit', 'elevation', 'latitude', 'longitude', 'population_5km', 'population_10km', 'population_30km', 'population_100km')
            .modify(function (query) {
                if (optionalAuth !== undefined) {
                    query.first(`population_5km`, `population_10km`, `population_30km``population_100m`)
                }
            })
            .where('id', '=', req.params.id)
            .then((rows) => {
                if (!rows) {
                    throw new VolcanoNotFound(req.route, req.params.id, 404)
                }
                else {
                    res.status(200).json(rows)
                }
            })
            .catch(err => next(err))
    }
});





module.exports = router;
