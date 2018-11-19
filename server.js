const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const User = require("./models/user");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/iitb_assignment');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
  }));

app.use(cors({
    optionsSuccessStatus: 200
}))


app.post("/users", function(req, res){
    console.log("-----req-----", req.body);
    
    User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
    })
    .then(function(user){
        console.log("---user---", user);
        res.status(200).send(user);
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send(err);
    })

})

app.post("/login", function(req, res){
    console.log("----login----", req.body);
    User.findOne({
        email : req.body.email,
        password : req.body.password
    })  
    .then(function(user){
        if(user === null)
        {
            res.status(400).send({msg : "No user exist",data : null, status : 400})
        }
        else
        {
            res.status(200).send({msg : "login successfull", data : user, status : 200})
        }
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send(err);
    })
})


app.listen(3000, () => {
    console.log("Server running on port 3000");
})