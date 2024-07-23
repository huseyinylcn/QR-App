const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const router = express.Router()

let UpdateEser = require('../Models/Update-Adding-Inscriptions/UpdateEser')
let AdminDetail = require('../Models/Data-Fetch/AdminDetail')


const uploadDirectory = path.join(__dirname, '../Public/img/MezarFotograf/');

// Dosya yükleme işlemi için multer konfigürasyonu
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    // Resim dosyasının adını rastgele oluşturun
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage: storage });



router.get('/:city/:town/:id', (req, res) => {
  if (!req.session.user) {
    res.redirect('/')
  } else {
    AdminDetail.AdminDetailGet(req.params.city, req.params.town, req.params.id).then((data) => {

      
        res.render('update', { title: 'Admin', veri: data })

      
    })
  }
})


let active = 0;
router.post('/', upload.single('image'), (req, res) => {
  if ((req.body.active) == 'on') active = 1; else active = 0

  if (!req.file) {

    UpdateEser.UpdateEserF(req.body.city, req.body.town, req.body.adress, req.body.guncelyol, req.body.esertitle, req.body.esertranslate, req.body.eserhakkinda, active, req.body.id).then((data) => {
      console.log('tamam')
    }).catch(err => {
      console.log('hata')
    })


    res.redirect(`/update/${req.body.city}/${req.body.town}/${req.body.id}`)


  } else {
    fs.unlink(`Public/${req.body.guncelyol}`, err => {
      if (err) {
        console.log('tamam', err)
      } else {
        console.log('tamamıfrshf')
      }
    })

    UpdateEser.UpdateEserF(req.body.city, req.body.town, req.body.adress, `/img/MezarFotograf/${req.file.filename}`, req.body.esertitle, req.body.esertranslate, req.body.eserhakkinda, active, req.body.id).then((data) => {
      console.log('tamam')
    }).catch(err => {
      console.log('hata')
    })
    res.redirect(`/update/${req.body.city}/${req.body.town}/${req.body.id}`)



  }
})

module.exports = router
