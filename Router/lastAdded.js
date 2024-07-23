const express = require('express')

const router = express.Router()

let lastAdded = require('../Models/Data-Fetch/lastAdded')



router.get('/',(req,res)=>{
    if (!req.session.user){
        res.redirect('/')
    }else{
        lastAdded.lastAddedF().then((data)=>{
            res.render('lastAdded',{title:'Admin',veri:data})
        })
    }
   
})




module.exports = router