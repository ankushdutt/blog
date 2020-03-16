var express     = require("express");
var router      = express.Router({mergeParams: true});
var Blog        = require("../models/blog");
var Comment     = require("../models/comment");
var middleware  = require("../middleware")

//POST
router.post("/blog/:id/comment", middleware.isLoggedIn, function(req, res){
    console.log(req.params.id)
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err)
        }
        else{
            Comment.create({text: req.body.comment}, function(err, comment){ //1st argument is a object, 2nd is callback function
                if(err){
                    console.log(err)
                }
                else{
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    comment.save()
                    blog.comments.push(comment._id)
                    blog.save() //imp
                    // req.flash("success", "Successfully added comment")
                    res.redirect("/blog/"+blog._id)
                }
            })
        }
    })
})

//DELETE
router.delete("/blog/:id/comment/:comment_id", middleware.checkCommentOwnership, function(req, res){
    console.log("hey")
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log("err: ", err)
            res.redirect("back")
        } else{
            // req.flash("success", "Comments Deleted!")
            console.log("deleted successfully")
            res.redirect("/blog/"+req.params.id)
        }
    })
})

module.exports = router