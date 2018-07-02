var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");


var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
    
    
});
var Cat = mongoose.model("Cat", catSchema);

Cat.create({
    name:"Snow White",
    age: 15,
    temperament: "cool"
    
},
    function(err, cat){
        if(err){
            
            console.log(err);
            
        }
        
        else{
            console.log(cat);
        }
    
});