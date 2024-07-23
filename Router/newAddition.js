const express = require('express')

const router = express.Router()

const multer = require('multer')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto');
const qr = require('qrcode');

const NewAdditions = require('../Models/Update-Adding-Inscriptions/NewAdditions');

function rastgeleTokenUretuzunluk(uzunluk) {
    return crypto.randomBytes(uzunluk).toString('hex');
}

const uploadDirectory = path.join(__dirname, '../Public/img/MezarFotograf/');

// Dosya yükleme işlemi için multer konfigürasyonu
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        // Resim dosyasının adını rastgele oluşturun
        const uniqueSuffix = rastgeleTokenUretuzunluk(32)
        const fileExtension = path.extname(file.originalname);
        cb(null, uniqueSuffix + fileExtension);
    },
});

const upload = multer({ storage: storage });







router.get('/', (req, res) => {
    if (req.session.user) {
        res.render('newAddition', { title: 'Admin', user: req.session.user })
    } else {

        res.redirect('/');
    }

})


let active = 0

router.post('/', upload.single('image'),(req, res) => {

    if (req.session.user) {
        if ((req.body.active) == 'on') active = 1; else active = 0
        
        const token = (req.file.filename).slice(0, -4);

        const url = `http://192.168.1.104:3000/${req.body.city}/${req.body.town}/${token}`;
        
        const outputFilePath = `Public/img/MezarQR/${token}.png`;
        const qrOptions = {
            color: {
                dark: '#000000',
                light: '#ffffff00',

            }
        };
        qr.toFile(outputFilePath, url, qrOptions, (err) => {

            if (err) throw err;

            NewAdditions.NewAdditionsF(
                req.body.city,
                req.body.town,
                req.body.adress,
                `/img/MezarQR/${token}.png`,
                `/img/MezarFotograf/${req.file.filename}`,
                req.session.user,
                req.body.esertitle,
                req.body.esertranslate,
                req.body.eserhakkinda,
                token,
                active).then((data) => {
                    res.redirect('/newAddition')
                })


        });


    } else {
        res.redirect('/');
    }

})






module.exports = router