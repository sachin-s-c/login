const express=require('express')
const path=require('path');
const bodyparser=require("body-parser")
const app=express();
const session=require("express-session");
const nocache=require('nocache')
const morgan = require('morgan')
const{v4: uuidv9}=require("uuid");
const router=require('./router')
const port=process.env.PORT||3000;

app.use(morgan('dev'))
app.use(nocache())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine','ejs');
//load static assets
app.use('/static', express.static(path.join(__dirname,'public')))
app.use('/assets', express.static(path.join(__dirname,'public/assets')))

app.use(session({secret:uuidv9(), resave:false, saveUninitialized:true, cookie:{maxAge:1000*60}}));
//home route

app.get('/',(req,res)=>{

    if(req.session.user){
        res.render('homepage',{user:req.session.user})
    }else{
        res.render('base',{title:"Login system"});
    }     
})
app.use('/route',router)


app.listen(port,()=>{console.log("listening to the server on http://localhost:3000")});
app.use((req, res, next)=>{
    req.session.isLoggedTrue=true;
    next();
});