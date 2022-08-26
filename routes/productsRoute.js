const express = require('express');
const bodyParser = require('body-parser');
const con = require('../config/dbconn');
const { param } = require('express/lib/request');
const router = express.Router()

router.get('/', (req, res) => {
    try{
      const strQry = `SELECT * FROM products`;

      con.query(strQry, (err, results) => {
          if (err) throw err;

          res.json({
              results: results,
              msg: "All Products Shown",
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
        const strQry = `SELECT * FROM products WHERE id = ${req.params.id}`;

        con.query(strQry, (err, results) => {
            if (err) throw err;

            res.json({
                results: results,
                msg: "1 Product Shown",
            });
        });
    } catch (error) {
        res.status(400).json({
            error
        })
    }
});


module.exports = router