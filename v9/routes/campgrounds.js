var express    = require("express"),
    router     = express.Router(),
    middleware = require("../middleware"),
    Campground = require("../models/campground");

//INDEX- Show All Campground

router.get("/campgrounds", function(req,res){
    
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds:allcampgrounds}); /* 1st one is the name we want to give to the object and 2nd one is the data we want to pass */ 
        }
    });

});
   

router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
    var name = req.body.name;
    var image= req.body.image;
    var price= req.body.price;
    var desc= req.body.description;
    var author ={
        id:req.user._id,
        username:req.user.username
    }
    var newCampground={name: name, image:image,price:price,description:desc,author:author};

    //Create a new campground and saveto DB

    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    });

   
});


router.get("/campgrounds/new",middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

//SHOW- Show more info about one Campground

router.get("/campgrounds/:id",function(req,res){
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec( function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundCampground);
             //render show templelate with that campground
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
   
});

//EDIT Campground Route
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership, function(req,res){

        
        Campground.findById(req.params.id, function(err,foundCampground){
            res.render("campgrounds/edit",{campground:foundCampground})
        });

    
});

//UPDATE Campground Route

router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
    //find and update the correct campground

    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds/" +req.params.id);
        }
    });
});

//DESTROY Route

router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
     Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
     });
});




module.exports = router;