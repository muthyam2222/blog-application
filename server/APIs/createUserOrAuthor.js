const UserAuthor = require("../models/userAuthorModel");

async function createUserOrAuthor(req,res){
    //business logic to create user or author
      //get user or author from req
      const newUserAuthor=req.body;
      //find user or author by email id
      const userInDb=await UserAuthor.findOne({email:newUserAuthor.email})
      //if user or author existed
      if(userInDb!==null){
        //check with role
        if(userInDb.role===newUserAuthor.role){
            res.status(200).send({message:newUserAuthor.role,payload:userInDb})
        }else{
            res.status(200).send({message:"Invalid role"})
        }
      }else{
        let newUserOrAuthor=new UserAuthor(newUserAuthor)
        let newUserAuthorDoc=await newUserOrAuthor.save();
        res.status(201).send({message:newUserAuthorDoc.role,payload:newUserAuthorDoc})
      }

}

module.exports=createUserOrAuthor