const express = require('express');
const router = express.Router();
const ownerModel = require("../modules/owner-model");

router.get("/", function(req,res){
    res.send("hey it's working");
});
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === "development"){
    router.post("/create", async function(req,res){
        let owners = await ownerModel.find();
        console.log(owners.length);
        if(owners.length > 0){
            return res
            .status(503)
            .send("You don't have permission to create a new owner.");
        }

        let {fullname, email, password} = req.body;

        let createdOwner = await ownerModel({
            fullname,
            email,
            password,
        });
        await createdOwner.save();
        res.status(201).send(createdOwner);
    })
};


router.get("/", function (req,res){
    res.send("hey it's working");
})

module.exports = router; 