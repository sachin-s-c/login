var express=require("express")
var router=express.Router();
const credential={
    email:"admin@gmail.com", password:"123"
}
//login user
router.post('/login',(req,res)=>{
   
    
    
    if(req.body.email==credential.email&& req.body.password==credential.password){
        req.session.user=req.body.email; 
        res.redirect('/route/homepage');
        //res.end("login sucessful")

    }else{
         //res.end("Invalid username or password")

         res.render('base',{title:"Express",login:"Invalid username or password"})


    }
    

});


//rooter for dashboard
router.get('/homepage',(req,res)=>{
    if(req.session.user){
        res.render('homepage',{user:req.session.user})
    }else{
        res.send("unauthorize user")
    }   
})
//route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err)
            res.send("Error")
        }else{
            res.render('base',{title:"Express",logout:"logout sucessfuly....!!"})
        }
    })
})
module.exports=router;
