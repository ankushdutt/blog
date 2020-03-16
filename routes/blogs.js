var express     = require("express");
var router      = express.Router();
var Blog        = require("../models/blog");
var middleware  = require("../middleware") //if directory is included then index.js file is taken as default

router.get("/blogs/new", function(req, res) {
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

//SHOW more info about campgrounds
router.get("/blog/:id", function(req, res) {
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundBlog)
            res.render("blogs/info", {blog: foundBlog})
        }
    })
})

// //EDIT
// router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
//     Campground.findById(req.params.id, function(err, foundCampground){
//         if(err){
//             res.redirect("/campgrounds")
//         } else{
//             res.render("campgrounds/edit", {campground: foundCampground})
//         }
//     })
// })

// //UPDATE
// router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
//     Campground.findByIdAndUpdate(req.params.id, req.body.cmp, function(err, updatedCmp){
//         if(err){
//             res.redirect("/campgrounds")
//         } else{
//             res.redirect("/campgrounds/" + req.params.id)
//         }
//     })
// })

//DELETE
router.delete("/blog/:id", function(req, res){
    console.log("routed to delte")
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