var middlewareObj ={};

var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash("error","Please Login First !");
        res.redirect("/login");
    }
}

middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){   //checks for user log in then only proceed
        Campground.findById(req.params.id, function(err,foundCampground){
            if(err){
                req.flash("error","Campgrfound Not Found !")
                res.redirect("back");
            }
            else{
                if(foundCampground.author.id.equals(req.user._id)) {  //checks for the logged in user to be creator of the campground then only edit
                next();
                }
                else{
                   req.flash("error", "You don't have the permiision to do that");
                   res.redirect("back"); 
                }
            }
        });

    }
    else{
        req.flash("error", "Please Login First!");
        res.redirect("back");
    }
}


middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){   //checks for if any user is logged in then only proceed
        Comment.findById(req.params.comment_id, function(err,foundComment){
            if(err){
                console.log(err);
                res.redirect("back");
            }  

            //checks if the user owns the cooment
            else{
                if(foundComment.author.id.equals(req.user._id)) {  //checks for the logged in user to be creator of the campground then only edit
                next();
                }
                else{
                    req.flash("error", "You don't have the permiision to do that");
                   res.redirect("back"); 
                }
            }
        });

    }
    else{
        req.flash("error", "Please Login First!");

        res.redirect("back");
    }
}



module.exports = middlewareObj;