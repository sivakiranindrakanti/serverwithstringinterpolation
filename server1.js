var http=require("http");
const express = require('express');
const path = require('path');
var app = require('express')();
var config = require('./story.json');
var titlePage= '<html lang="te" dir="ltr"><head><meta charset="utf-8">  <style> *{ margin: 0px; padding: 0px;}body{width: 550px;height: 400px;}.n1{ position: relative;top:10px;left: 600px;}.n2{position: relative;left:480px;top: 80px;}.n3 {position: relative;left: 600px;top:140px;}nav{position: relative;top:220px;left:1000px;width:120px;height: 60px;background-color: aqua;}nav ul{position: relative;top:20px;background-color: transparent;left:40px;}.n4{position: relative;top: 170px;left: 120px;width:120px;height: 60px;background-color: aqua;}.n4 ul{position: relative;top:20px;background-color: transparent;left:30px;}</style></head><body><div class="n1"><h2>${english}</h2></div><div class="n2"><img src ="${image}" width ="340" height="250"></div><div class="n3"><h3>${telugu}</h3></div><nav><ul><a href="http://localhost:5000/Storybook/page/${nextButton}"color="transparent">Next</a></ul></nav></body></html>';
var Page= '<html lang="te" dir="ltr"><head><meta charset="utf-8">  <style> *{ margin: 0px; padding: 0px;}body{width: 550px;height: 400px;}.n1{ position: relative;top:30px;left: 300px;}.n2{position: relative;left:400px;top: 80px;}.n3 {position: relative;left: 300px;top:140px;}nav{position: relative;top:180px;left:1000px;width:120px;height: 60px;background-color: aqua;}nav ul{position: relative;top:20px;background-color: transparent;left:40px;}.n4{position: relative;top: 120px;left: 120px;width:120px;height: 60px;background-color: aqua;}.n4 ul{position: relative;top:20px;background-color: transparent;left:30px;}</style></head><body><div class="n1"><h2>${english}</h2></div><div class="n2"><img src ="${image}" width ="340" height="250"></div><div class="n3"><center><h3>${telugu}</h3></center></div><nav><ul><a href="http://localhost:5000/Storybook/page/${nextButton}"color="transparent">Next</a></ul></nav><div class="n4"><ul><a href="http://localhost:5000/Storybook/page/${previousButton}">Previous</a></ul></div></body></html>';
app.use("/", express.static(path.join(__dirname, "./public")));
app.get('/Storybook/page/:id', (req,res) =>{
    var Number = req.params.id;
    console.log(Number);
    var pageDetails = getmypage(Number);
    res.send(pageDetails);
});
function getmypage(Number){
  const fs = require('fs');
  if(Number == 1){
    var english = config.title_en;
    var image = '/' + config.cover_image;
    var telugu = config.title;
    var nextButton = parseInt(Number) + 1;
    var pageDetails  = (eval("`" + titlePage + "`"));
    console.log('hai');
    return(pageDetails);
  }
  else if(Number >= 2){
    if(config.pages[Number - 2] == null){
        return('<html lang="te" dir="ltr"><head><meta charset="utf-8">  <style> *{ margin: 0px; padding: 0px;}body{width: 550px;height: 400px;}.n1{ position: relative;top: 150px;left: 550px;}</style></head><body><div class="n1"><h1>THE END</h2></div></body></html>');
    }
    else{
      var english = config.pages[Number - 2].english;
      var image = '/'+ config.pages[Number - 2].image;
      var telugu = config.pages[Number - 2].telugu;
      var nextButton = parseInt(Number) + 1;
      var previousButton = parseInt(Number) - 1;
      var pageDetails  = (eval("`" + Page + "`"));
      console.log('hello');
      return(pageDetails);
    }
  }
}
app.listen(5000, () => {
    console.log('server started');
});