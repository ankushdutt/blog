var express     = require("express");
var router      = express.Router();
var Blog        = require("../models/blog");
var middleware  = require("../middleware") //if directory is included then index.js file is taken as default

router.get("/blog/new", function(req, res) {
    res.render("blogs/new")
})

//POST
router.post("/blogs", middleware.isLoggedIn, function(req, res) {
    console.log(req.body)
    var title = req.body.title
    var image = req.body.image
    var body = req.body.body
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newBlog = {title, image, body, author}
    Blog.create(newBlog, function(err, newlyCreated){
            if(err){
                console.log(err);
                res.render("blogs/new")
            } else{
                console.log(newlyCreated)
                res.redirect("/")
            }
        });
})

//SHOW more info
router.get("/blog/:id", function(req, res) {
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
        foundBlog.body = marked(foundBlog.body)
        if(err){
            console.log(err);
        }
        else{
            res.render("blogs/info", {blog: foundBlog})
        }
    })
})

//EDIT
router.get("/blog/:id/edit", middleware.checkBlogOwnership, function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/")
        } else{
            res.render("blogs/edit", {blog: foundBlog})
        }
    })
})

//UPDATE
router.put("/blog/:id", middleware.checkBlogOwnership, function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body, function(err, updatedBlog){
        if(err){
            res.redirect("/")
        } else{
            res.redirect("/blog/" + req.params.id)
        }
    })
})

//DELETE
router.delete("/blog/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err)
            res.redirect("/")
        } else{
            console.log("deleted")
            res.redirect("/")
        }
    })
})

module.exports = router