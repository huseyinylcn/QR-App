const express = require('express')

const router = express.Router()
let UserControl = require('../Models/Users/UsersControl')











router.get('/', (req, res) => {
    res.render('adminLogin', { title: 'Admin' })
})



router.post('/', (req, res) => {
    UserControl.UserControlF(req.body.mail, req.body.password).then((data) => {

        if ((data.length) != 0) {
            req.session.user = req.body.mail;
            res.redirect('/newAddition')
        }
        else {
            res.redirect('/')

        }
    })

})










router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/'); // Oturum başarıyla temizlendi, giriş sayfasına yönlendirin
        }
    });
});



module.exports = router