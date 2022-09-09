const bodyParser = require("body-parser");
const con = require("../config/dbcon");
const express = require("express");
const router = express.Router();

router.get("/users/:id/cart", (req, res) => {
    try {
        const strQuery = "SELECT cart FROM users WHERE id = ?";
        con.query(strQuery, [req.user.id], (err, results) => {
            if (err) throw err;
            (function Check(a, b) {
                a = parseInt(req.user.id);
                b = parseInt(req.params.id);
                if (a === b) {
                    res.json(results[0].cart);
                } else {
                    res.json({
                        a,
                        b,
                        msg: "Please Login To View cart",
                    });
                }
            })();
        });
    } catch (error) {
        throw error;
    }
});