var mongoose = require("mongoose");
//var db = require("../models/index");
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
let schema = new mongoose.Schema(
    {
      name : {
          type : String
      },
      email : {
          type : String,
          required : true,
          index : {
              unique : true
          }
      },
      password : {
          type : String,
          required: true
        }
    }
)
schema.plugin(timestamps);

const User = mongoose.model("User", schema);



module.exports = User;