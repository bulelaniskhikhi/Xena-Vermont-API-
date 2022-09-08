const express = require('express');
const bodyParser = require('body-parser');
const con = require('../config/dbconn');
const {
    param
} = require('express/lib/request');
const router = express.Router()

router.get('/', (req, res) => {
    try {
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
    try {
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

router.get("/rating/:esrbRating", (req, res) => {
    try {
        const strQry = `SELECT * FROM products WHERE esrbRating = ?`;

        con.query(strQry, req.params.esrbRating, (err, results) => {
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

router.get("/genre/:genre", (req, res) => {
    try {
        const strQry = `SELECT * FROM products WHERE genre = ?`;

        con.query(strQry, req.params.genre, (err, results) => {
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

router.put("/:id", bodyParser.json(), (req, res) => {
    try {
        const {
            id,
            title,
            romajiTitle,
            kanjiTitle,
            frontCoverImg,
            backCoverImg,
            frontDiscCoverImg,
            backDiscCoverimg,
            realisedDate,
            serialCode,
            studioDev,
            studioPub,
            priceRands,
            priceYens,
            gameDesc,
            esrbRating,
            esrbRatingImg,
            genre,
            features
        } = req.body
        const str = `UPDATE products SET ? WHERE id = ${req.params.id}`

        const product = {
            // bd.
            id,
            title,
            romajiTitle,
            kanjiTitle,
            frontCoverImg,
            backCoverImg,
            frontDiscCoverImg,
            backDiscCoverimg,
            realisedDate,
            serialCode,
            studioDev,
            studioPub,
            priceRands,
            priceYens,
            gameDesc,
            esrbRating,
            esrbRatingImg,
            genre,
            features
        }

        con.query(str, product, (err, results) => {
            if (err) throw err;

            res.json({
                results,
                msg: "updated product"
            })
        })
    } catch (error) {
        throw error
    }
});

router.delete("/:id", (req, res) => {
    try {
        const str = `DELETE FROM products WHERE id = ${req.params.id}`;

        con.query(str, (err, results) => {
            if (err) throw err;

            res.json({
                results,
                msg : "item deleted"
            })
        })
    } catch (error) {
        throw error
    }
});

// add product
router.post("/", bodyParser.json(), (req, res) => {
    try {
      const products = req.body;
      const strQry = `INSERT INTO products (title, romajiTitle, kanjiTitle, frontCoverImg, backCoverImg, frontDiscCoverImg, backDiscCoverimg, realisedDate, serialCode, studioDev, studioPub, priceRands, priceYens, gameDesc, esrbRating, esrbRatingImg, genre, features) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  
      con.query(
        strQry,
        [
          products.title,
          products.romajiTitle,
          products.kanjiTitle,
          products.frontCoverImg,
          products.backCoverImg,
          
          products.frontDiscCoverImg,
          products.backDiscCoverimg,
          products.realisedDate,
          products.serialCode,
          products.studioDev,
          products.studioPub,

          products.priceRands,
          products.priceYens,
          products.gameDesc,
          products.esrbRating,
          products.esrbRatingImg,

          products.genre,
          products.features,
          
        ],
        (err, results) => {
          if (err) throw err;
          res.status(200).json({
            msg: "Product Added",
          });
        }
      );
    } catch (error) {
      res.status(200).json({
        error,
      });
    }
  });

module.exports = router