var express = require("express")
var router  = express.Router()
var passport = require("passport")
var User = require("../models/user")
var middleware  = require("../middleware")

//Home GET ROUTE----
router.get("/", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err)
        } else{
            res.render("home", {blogs: blogs})
        }
    })
})

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username})
    console.log(newUser)
    User.register(newUser, req.body.password, function(err, user){
        if(err){
             return res.render("register")
        }
        else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/blogs")
            })
        }
    })
})
module.exports = router