const exp=require('express')
const adminApp=exp.Router();

//API
adminApp.get("/",(req,res)=>{
    res.send({message:"from admin api"})
})


//export
module.exports=adminApp;
