const exp=require('express')
const app=exp();
const mongoose=require('mongoose');
const userApp = require('./APIs/userApi');
const authorApp = require('./APIs/authorApi');
const adminApp = require('./APIs/adminApi');
const cors=require('cors')
app.use(cors())
//process.env  (it won't returns any thing)
require('dotenv').config(); 

//if some issues occur in .env file it will take second port number as we given 4000
const port=process.env.PORT || 4000 

//db connection
mongoose.connect(process.env.DBURL)
.then(()=>{
    console.log("DB connection success")
    app.listen(port,()=>console.log(`server listening on port ${port} ...`))
})
.catch(err=>console.log("Error in DB connection ",err))

//add body parser middleware
app.use(exp.json())
//connect API routes
app.use("/user-api",userApp);
app.use("/author-api",authorApp);
app.use("/admin-api",adminApp);


//error handler
app.use((err,req,res,next)=>{
    console.log("err object in express error handler :",err)
    res.send({message:err.message})
})
