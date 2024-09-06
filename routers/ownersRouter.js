const express = require('express');
const router = express.Router();
const ownerModel = require("../modules/owner-model");

router.get("/", function(req,res){
    res.send("hey it's working");
});

console.log(process.env.NODE_ENV);



module.exports = router; 