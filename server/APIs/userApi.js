const exp=require('express');
const UserAuthor = require('../models/userAuthorModel');
const userApp=exp.Router();
const expressAsyncHandler=require('express-async-handler');
const createUserOrAuthor = require('./createUserOrAuthor');
const Article=require('../models/articleModel');

//API

//create a new user
userApp.post('/user',expressAsyncHandler(createUserOrAuthor))

//add comment
userApp.put('/comment/:articleId',expressAsyncHandler(async(req,res)=>{
    //get comment obj
    const commentObj=req.body;
    //add comment to comments array of article
    const articleWithComment=await Article.findOneAndUpdate({articleId:req.params.articleId},{$push:{comments:commentObj}},{returnOriginal:false})
    //send res
    res.status(200).send({message:"comment added",payload:articleWithComment})
}))

//export
module.exports=userApp;
