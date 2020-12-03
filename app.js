//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Velit ullamco fugiat est dolore enim reprehenderit et dolore aute dolore laborum sunt. Esse mollit excepteur fugiat eiusmod incididunt cupidatat laborum consequat amet nulla fugiat in. Veniam tempor aliquip do ipsum ex officia irure id pariatur ad. Irure ut minim velit reprehenderit amet.";
const aboutContent = "Velit dolore labore eu irure eu. Minim est Lorem nulla cillum tempor veniam do officia voluptate in. Duis reprehenderit minim est ad elit. Irure aute quis esse aute sit incididunt mollit.";
const contactContent = "Excepteur ipsum deserunt exercitation eiusmod elit exercitation ea exercitation exercitation ut laborum. Minim sunt sint magna commodo anim laborum qui. Eiusmod adipisicing ea aute laborum non irure cillum laborum laboris proident sit sunt. Quis velit voluptate incididunt non consequat elit nostrud. Est cillum amet occaecat sint mollit sint cupidatat laboris. Quis incididunt nulla aliquip sit consectetur irure enim est nisi. Ipsum quis laborum aliquip fugiat officia voluptate incididunt et dolore ad non ex veniam.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
