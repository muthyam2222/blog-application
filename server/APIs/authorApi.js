const exp=require('express');
const expressAsyncHandler = require('express-async-handler');
const createUserOrAuthor = require('./createUserOrAuthor');
const Article = require('../models/articleModel');
const authorApp=exp.Router();
const {requireAuth}=require('@clerk/express')
require('dotenv').config();

//API's
//create a new author
authorApp.post('/author',expressAsyncHandler(createUserOrAuthor))

//create a new article
authorApp.post('/article',expressAsyncHandler(async(req,res)=>{
    //get a new article from req
    const newArticleObj=req.body;
    const newArticle=new Article(newArticleObj)
    const newArticleDoc=await newArticle.save();
    res.status(201).send({message:"article",payload:newArticleDoc})
}))

//read all articles
authorApp.get('/articles',requireAuth({signInUrl:"unathorized"}),expressAsyncHandler(async(req,res)=>{
    //read all articles
    const listOfArticles=await Article.find({isArticleActive:true});
    res.status(200).send({message:"articles",payload:listOfArticles})
}))

authorApp.get('/unathorized',(req,res)=>{
    res.send({message:"Unathorized request"})
})

//modify an article by article id
authorApp.put('/article/:articleId',requireAuth({signInUrl:"unathorized"}),expressAsyncHandler(async(req,res)=>{
    //get modified article
    const modifiedArticle=req.body;
    //update article by article id
    const latestArticle=await Article.findByIdAndUpdate(modifiedArticle._id,{...modifiedArticle},{returnOriginal:false})
    //send res
    res.status(200).send({message:"article modified",payload:latestArticle})
}))

//delete(soft delete) an article by article id
authorApp.put('/articles/:articleId',requireAuth({signInUrl:"unathorized"}),expressAsyncHandler(async(req,res)=>{
    //get modified article
    const modifiedArticle=req.body;
    //update article by article id
    const latestArticle=await Article.findByIdAndUpdate(modifiedArticle._id,{...modifiedArticle},{returnOriginal:false})
    //send res
    res.status(200).send({message:"article deleted",payload:latestArticle})
}))



//export
module.exports=authorApp;
