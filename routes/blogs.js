var express     = require("express");
var router      = express.Router();
var Blog        = require("../models/blog");
var middleware  = require("../middleware") //if directory is included then index.js file is taken as default

router.get("/blogs/new", function(req, res) {
    res.render("blogs/new")
})

//POST
router.post("/blogs", function(req, res) {
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

// //SHOW more info about campgrounds
// router.get("/:id", function(req, res) {
//     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCmp){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log(foundCmp)
//             res.render("campgrounds/show", {campground: foundCmp})
//         }
//     })
// })

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

// //DELETE
// router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
//     Campground.findByIdAndRemove(req.params.id, function(err){
//         if(err){
//             res.redirect("/campgrounds")
//         } else{
//             res.redirect("/campgrounds")
//         }
//     })
// })

module.exports = router