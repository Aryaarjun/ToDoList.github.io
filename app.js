const bodyParser = require("body-parser");
const express = require("express");
const app = express();
// whenever using bodyparser in our code must include this below line. this is helps to take the input.
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var ListItems =["Buy food", "Cook Food", "Eat Food"];
let workItem = [];
let hobbyList = []; 

app.get("/", function(req, res){
    var date = new Date();
    var options = {
        weekday : "long",
        day : "numeric",
        month : "long"
    };
    // for converting it to hindi simply change the first parameter of the below function like --> "en-US" ->"hi-IN"
    var day = date.toLocaleDateString("en-US", options);
    res.render("list", {ListTitle : day, setItems : ListItems});
});
app.post("/", function(req, res){
    console.log(req.body);
    let item = (req.body.newItem);
    if(req.body.list === "Work"){
        workItem.push(item);
        res.redirect("/work");
    }else if(req.body.list === "Your"){
        hobbyList.push(item);
        res.redirect("/Hobby");
    }else{
        ListItems.push(item);
        res.redirect("/");
    }
    
    
})
app.get("/work", function(req, res){
    res.render("list", {ListTitle : "Work List", setItems : workItem});
});
app.post("/work", function(req, res){
    let w = (req.body.newItem);
    workItem.push(w);
    res.redirect("/work");
})
app.get("/Hobby", function(req, res){
    res.render("list", {ListTitle : "Your Hobby", setItems : hobbyList});
});
app.post("/Hobby", function(req, res){
    console.log(req.body);
    res.redirect("/Hobby");
})
    
    app.listen(3000, function(){
        console.log("server is running!");
    })