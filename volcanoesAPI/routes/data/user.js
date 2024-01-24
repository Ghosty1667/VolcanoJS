const express = require('express');
const router = express.Router();
const bcypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TokenExpired, InvaildUser, UserNotFound, PasswordNotFound, UserFound, TokenInvaild } = require('./error');
const authorize = require('./authorization');


router.post('/login', (req, res, next) => {

    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
        throw new InvaildUser(email, password, 400)
    }
    else {
        const queryUsers = req.db("user").select("*").where("email", "=", email)
        queryUsers
            .then((users) => {
                if (users.length === 0) {
                    throw new UserNotFound(email, password, 401)
                }

                const user = users[0]
                return bcypt.compare(password, user.hash)
            })
            .then((match) => {
                if (!match) {
                    throw new PasswordNotFound(email, password, 401)
                }
                const secretKey = "13592640120991841177";
                const expires_in = 60 * 60 * 24
                const exp = Date.now() + expires_in + 1000
                const token = jwt.sign({ email: email, exp }, process.env.SECRETKEY)
                res.status(200).json({ token_type: "Bearer", token, expires_in })
            })
            .catch(err => next(err))
    }
});

router.post('/register', (req, res, next) => {

    const email = req.body.email
    const password = req.body.password


    if (!email || !password) {
        throw new InvaildUser(email, password, 400)
    }

    const queryUsers = req.db.from('user').select("*").where("email", "=", email)
    queryUsers.then((user) => {
        if (user.length > 0) {
            throw new UserFound(email, password, 400)
        }
        const saltRounds = 10
        const hash = bcypt.hashSync(password, saltRounds)
        return req.db.from("user").insert({ email, hash })
    })
        .then(() => {
            res.status(201).json({ message: "User created" })
        }).catch(err => next(err))
});


router.get("/:email/profile", authorize, function (req, res, next) {
    if (req.params.email === undefined) {
        res.status(400).json({ error: true, message: "Invalid query parameters. Query parameters are not permitted." })
    }
    req.db.from('user').select('id', 'email', 'firstname', 'lastname', 'dob', 'address').where('email', '=', req.params.email)
        .then((rows) => {
            if (!rows.length) {
                res.status(400).json({ error: true, message: "No user exists" })
            }
            else {
                res.status(200).json(rows)
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: true, message: "Error in MySQL query" })
        })
});

router.put("/:email/profile", authorize, function (req, res, next) {
    if (!req.body.firstname || !req.body.lastname || !req.body.dob || !req.body.address) {
        res.status(400).json({
            error: true,
            message: "Request body incomplete, both email and password are required"
        });
        console.log(`Error on request body:`, JSON.stringify(req.body));
    } else {
        const date = Date.parse(req.body.dob) ? new Date(req.body.dob) : null;
        const filter = {
            "email": req.params.email,
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "dob": date,
            "address": req.body.address,
        };

        req.db.from('user').where({ email: req.params.email }).update({ firstname: filter.firstname, lastname: filter.lastname, dob: filter.dob, address: filter.address })
            .then((rows) => {
                if (rows.length === 0) {
                    res.status(400).json({ error: true, message: "User updated" })
                }
                else {
                    console.log(rows.length)
                    res.status(200).json(rows)
                }
            })
            .catch((err) => {
                res.status(500).json({ error: true, message: `Error in MySQL query : ${err}` })
            })
    }
});




module.exports = router;