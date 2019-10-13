var mongoose   =  require("mongoose");
var Campground =  require("./models/campground");
var Comment    =  require("./models/comment");

var data =[
    {
        name:"Cloud's Rest",
        image:"https://pixabay.com/get/52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c722f7cdc964cc65d_340.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis leo enim. Donec tempor, neque eu imperdiet placerat, felis dolor facilisis nisi, quis rutrum lacus erat ut quam. Sed cursus mollis elit. Pellentesque lobortis vel magna nec rhoncus. Quisque vehicula lorem mi, non consectetur felis blandit et. Sed sagittis est eget dictum sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
    },
    {
        name:"Canyon's Rest",
        image:"https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c722f7cdc964cc65d_340.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis leo enim. Donec tempor, neque eu imperdiet placerat, felis dolor facilisis nisi, quis rutrum lacus erat ut quam. Sed cursus mollis elit. Pellentesque lobortis vel magna nec rhoncus. Quisque vehicula lorem mi, non consectetur felis blandit et. Sed sagittis est eget dictum sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
    },
    {
        name:"Glacier's Rest",
        image:"https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c722f7cdc964cc65d_340.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis leo enim. Donec tempor, neque eu imperdiet placerat, felis dolor facilisis nisi, quis rutrum lacus erat ut quam. Sed cursus mollis elit. Pellentesque lobortis vel magna nec rhoncus. Quisque vehicula lorem mi, non consectetur felis blandit et. Sed sagittis est eget dictum sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
    }

]

//Remove all existing campgrounds

function seedDB(){
Campground.remove({},function(err){
    if(err){
        console,log(err);
    }
    else{
        console.log("Removed Campgrounds");
    }

    // Then Add a few Campgrounds

data.forEach(function(seed){

    Campground.create(seed,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            console.log("Added Campground!");

            //Create a cooment
            
            Comment.create({
                text:"This place is great but I wish I had internet",
                author:"Homer"
            },
            function(err,comment){
                if(err){
                    console.log(err);
                }
                else{
                campground.comments.push(comment);
                campground.save();
                console.log("New comment created");
                }
            
            });
        }
    });
}); 

});

}

module.exports = seedDB;