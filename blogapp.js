var express       = require("express"),
app               = express(),
bodyParser        = require("body-parser"),
mongoose          = require("mongoose");

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("publice"));
app.use(bodyParser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}

});
var Blog = mongoose.model("Blog", blogSchema);

BLog.creat({
    title: "Test Blog",
    image:"https://images.pexels.com/photos/54455/cook-food-kitchen-eat-54455.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    body:"Hello THis is a blog post"
});




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Sever is running");
    
});