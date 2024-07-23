const express = require('express')
let QrGet = require('../Models/Data-Fetch/QrGet')

const router = express.Router()


router.get('/', (req, res) => {

    if (req.session.user) {
        QrGet.QrGetF().then(data => {
            res.render('qrManagement', { title: 'ADMİN', veri:data})
        })
    }
    else {
        res.redirect('/')

    }

})



module.exports = router