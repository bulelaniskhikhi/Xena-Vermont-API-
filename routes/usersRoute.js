const express = require('express');
const bodyParser = require('body-parser');
const con = require('../config/dbconn');
const { param } = require('express/lib/request');
const router = express.Router();
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const { json } = require('express/lib/response');

router.get('/', (req, res) => {
    try{
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
    try{
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

router.patch('/', bodyParser.json(), (req, res) => {
    try{
      const strQry = `SELECT * FROM users where userEmail = ?`;

      con.query(strQry, req.body.userEmail,  (err, results) => {
          if (err) throw err;
        if (results.length>0) {
            bcrypt.compare(req.body.userPassword, results[0].userPassword, (err, check) => {
                if (check) {
                    jwt.sign(payload, process.env.SECRET_KEY, (err, wd) =>{
                       res.json({
                           token: wd
                       })
                    })
                }
            })
        }


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

module.exports = router