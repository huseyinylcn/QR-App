const express = require('express')

const router = express.Router()

let MyAdditions = require('../Models/Data-Fetch/MyAdditions')






router.get('/',(req,res)=>{
    if (!req.session.user){
        res.redirect('/')
    }else{
        MyAdditions.MyAdditionsF(req.session.user).then((data)=>{
            res.render('MyAdditions',{title:'Admin',veri:data})
        })
    }
   
})






module.exports = router