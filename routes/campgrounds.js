var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middlware = require("../middleware/index.js");

router.get("/", function(req,res){
   
        //Get all campgrounds from DB
        Campground.find({}, function(err,campgrounds){
            if(err){
                console.log(err);
            } else{
                res.render("campgrounds/campgrounds",{campgrounds:campgrounds, currentUser: req.user});
            }
        });
        
});

router.post("/", middlware.isLoggedIn, function(req,res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author ={
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name:name, image:image, description:desc, author:author, price: price }
    
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
             res.redirect("/campgrounds");
        }
    });
   
});


router.get("/new", middlware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new.ejs");
});


//SHows more info about one campground
router.get("/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    req.params.id
    //render show template with that campground
  
});

// Edit campground route
router.get("/:id/edit", middlware.checkCampgroundOwnership, function(req, res) {
        Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit",{campground: foundCampground});
    });
});
//Update campground route
router.put("/:id",middlware.checkCampgroundOwnership, function(req,res){
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY CAMPGROUND

router.delete("/:id", middlware.checkCampgroundOwnership, function(req,res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       } else{
           req.flash("success", "Campground deleted");
           res.redirect("/campgrounds");
       }
   });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



module.exports = router;