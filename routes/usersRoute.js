const express = require('express');
const bodyParser = require('body-parser');
const con = require('../config/dbconn');
const {
    param
} = require('express/lib/request');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    json
} = require('express/lib/response');

router.get('/', (req, res) => {
    try {
        const strQry = `SELECT * FROM users`;

        con.query(strQry, (err, results) => {
            if (err) throw err;

            res.json({
                results: results,
                msg: "All Users Shown",
            });
        });
    } catch (error) {
        res.status(400).json({
            error
        })
    }
});

router.get("/:id", (req, res) => {
    try {
        const strQry = `SELECT * FROM users WHERE id = ${req.params.id}`;

        con.query(strQry, (err, results) => {
            if (err) throw err;

            res.json({
                results: results,
                msg: "1 users Shown",
            });
        });
    } catch (error) {
        res.status(400).json({
            error
        })
    }
});

router.patch('/', bodyParser.json(), async (req, res) => {
    try {
        const strQry = `SELECT * FROM users where userEmail = ?`;

        con.query(strQry, req.body.userEmail, async (err, results) => {
            if (err) throw err;
            if (results.length > 0) {

                let check =  await bcrypt.compare(req.body.userPassword, results[0].userPassword)
                // res.send(check)
                if (check === true) {

                    const payload = {
                        userName: results[0].userName,
                        userEmail: results[0].userName,
                        userPassword: results[0].userPassword,
                        userRole: results[0].userRole,
                    }
                    jwt.sign(payload, process.env.jwtSecret, (err, wd) => {
                        res.json({
                            payload,
                            token: wd

                        })
                    })
                } else {
                    res.json({
                        msg: "password is wrong"
                    })
                }

            } else {
                res.json({
                    results: results,
                    msg: "All Users Shown",
                });
            }



        });
    } catch (error) {
        res.status(400).json({
            error
        })
    }
});

router.post("/", bodyParser.json(), async (req, res) => {
    try {
        const strQry = `SELECT * FROM users WHERE userEmail = ?`

        con.query(strQry, req.body.userEmail, async (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                res.json({
                    msg: "email already exists"
                })
            } else {
                req.body.userPassword = await bcrypt.hash(req.body.userPassword, 10)
                const insertstrQry = `INSERT INTO users (userName, userPassword, userEmail, userRole) VALUES (?,?,?,?)`

                con.query(insertstrQry, [req.body.userName, req.body.userPassword, req.body.userEmail, req.body.userRole], (err, insertResults) => {
                    if (err) throw err;

                    res.json({
                        msg: "register successful "
                    })
                })
            }
        })
    } catch (e) {
        res.status(400).json({
            err: e.message
        })
    }
})

module.exports = router