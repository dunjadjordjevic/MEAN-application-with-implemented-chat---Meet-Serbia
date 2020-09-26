const express = require('express');
const ProductAd = require('../models/ProductAd');
const AccommodationAd = require('../models/AccommodationAd');
const router = express.Router();
const multer = require('multer');
var fs = require('fs');
var path = require('path');

var pictureOfAdProduct=false;
var pictureOfAdAccommodation=false;

const fileFilter = (req, file, cb) => {

   
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg')
    {
        //check if there is same picture in uploads/ads/
        fs.stat('./uploads/ads/' + file.originalname , function(err) {
            if (!err) {
                console.log('Slika pod tim imenom već postoji');
                cb(null, false);
                pictureOfAdProduct=false;
                pictureOfAdAccommodation = false;
            }
            else 
            if (err.code === 'ENOENT') {
                //console.log('file or directory does not exist');
                //file has been saved
                cb(null, true);
                pictureOfAdProduct=true;
                pictureOfAdAccommodation=true;
            }
        });
    }
    else
    {
        //error has not set, and file has not saved
        //new Error('message')
        cb(null, false);
    }
};

const storage = multer.diskStorage({
   
    destination: function(req, file, cb) {

        cb(null, './uploads/ads/');
    }
    , filename: function( req, file, cb) {
       // console.log()
        //TO DO: umesto file.originalname staviti username user.username
        // file.originalname
        cb(null, file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
});



router.get('/myProductAds', (req, res) => {

    let usernameGet = req.query.username;

    ProductAd.find({ownerUsername: usernameGet}, (err, myProductAds) =>
    {
        if (err)
        {
            console.log("Greska pri dohvatanju svih oglasa proizvoda iz baze");
            console.log(err);
            res.json({success: false, msg:'Greška pri dohvatanju oglasa za proizvode iz baze, za korisnika' + usernameGet, bodyOfResponse: null});
        }
        else
        {
            res.json({success: true, msg:'Uspešno su dohvaćeni svi oglasi za proizvode', bodyOfResponse: myProductAds});
        }
    });
});

router.get('/myAccommodationAds', (req, res) => {

    let usernameGet = req.query.username;
    AccommodationAd.find({ownerUsername: usernameGet}, (err, myAccommodationAds) =>
    {
        if (err)
        {
            console.log("Greska pri dohvatanju svih oglasa za smeštaj iz baze");
            console.log(err);
            res.json({success: false, msg:'Greška pri dohvatanju oglasa za smeštaj iz baze, za korisnika' + usernameGet, bodyOfResponse: null});
        }
        else
        {
            res.json({success: true, msg:'Uspešno su dohvaćeni svi oglasi za smeštaj', bodyOfResponse: myAccommodationAds});
        }
    });
});

router.get('/productAd', (req, res) => {

    let idGet = req.query.id;

    ProductAd.find({_id: idGet}, (err, productAd) =>
    {
        if (err)
        {
            console.log("Greska pri dohvatanju oglasa iz baze");
            console.log(err);
            res.json({success: false, msg:'Greška pri dohvatanju oglasa za proizvod iz baze', bodyOfResponse: null});
        }
        else
        {
            res.json({success: true, msg:'Uspešno je dohvaćen oglas za proizvod', bodyOfResponse: productAd});
        }
    });
});

router.get('/accommodationAd', (req, res) => {

    let idGet = req.query.id;

    AccommodationAd.find({_id: idGet}, (err, accommodationAd) =>
    {
        if (err)
        {
            console.log("Greska pri dohvatanju oglasa iz baze");
            console.log(err);
            res.json({success: false, msg:'Greška pri dohvatanju oglasa za smeštaj iz baze', bodyOfResponse: null});
        }
        else
        {
            res.json({success: true, msg:'Uspešno je dohvaćen oglas za smeštaj', bodyOfResponse: accommodationAd});
        }
    });
});


router.post('/productAd/update', (req, res) => {

    let idPost = req.body.id;
    let propertyPost = req.body.property;

    //String type -> convert to Number if it is needed
    let valuePost = req.body.value;

    switch(propertyPost) { 
        case 'description': { 

            //returns old document which is after this changed 
            ProductAd.findOneAndUpdate({_id: idPost}, {description: valuePost}, (err, productAd) =>
            {
                if (err)
                {
                    console.log("Greska pri izmeni oglasa");
                    console.log(err);
                    res.json({success: false, msg:'Greška pri izmeni oglasa za proizvod', bodyOfResponse: null});
                }
                else
                {
                    res.json({success: true, msg:'Uspešno je izmenjen oglas za proizvod', bodyOfResponse: productAd});
                }
            });

           break; 
        } 
        case 'structureOfProduct': { 
            ProductAd.findOneAndUpdate({_id: idPost}, {structureOfProduct: valuePost}, (err, productAd) =>
            {
                if (err)
                {
                    console.log("Greska pri izmeni oglasa");
                    console.log(err);
                    res.json({success: false, msg:'Greška pri izmeni oglasa za proizvod', bodyOfResponse: null});
                }
                else
                {
                    res.json({success: true, msg:'Uspešno je izmenjen oglas za proizvod', bodyOfResponse: productAd});
                }
            });  
          break; 
       } 
        case 'weight': { 
            let valuePostNum = Number.parseFloat(valuePost);
            ProductAd.findOneAndUpdate({_id: idPost}, {weight: valuePostNum}, (err, productAd) =>
            {
                if (err)
                {
                    console.log("Greska pri izmeni oglasa");
                    console.log(err);
                    res.json({success: false, msg:'Greška pri izmeni oglasa za proizvod', bodyOfResponse: null});
                }
                else
                {
                    res.json({success: true, msg:'Uspešno je izmenjen oglas za proizvod', bodyOfResponse: productAd});
                }
            });  
         
           break; 
        } 
        case 'price': { 
            let valuePostNum = Number.parseFloat(valuePost);

            ProductAd.findOneAndUpdate({_id: idPost}, {price: valuePostNum}, (err, productAd) =>
            {
                if (err)
                {
                    console.log("Greska pri izmeni oglasa");
                    console.log(err);
                    res.json({success: false, msg:'Greška pri izmeni oglasa za proizvod', bodyOfResponse: null});
                }
                else
                {
                    res.json({success: true, msg:'Uspešno je izmenjen oglas za proizvod', bodyOfResponse: productAd});
                }
            });  
          break; 
       } 

        default: { 
           break; 
        } 
     } 


});


router.post('/accommodationAd/update', (req, res) => {

    let idPost = req.body.id;
    let propertyPost = req.body.property;

    //String type -> convert to Number if it is needed
    let valuePost = req.body.value;

    switch(propertyPost) { 
        case 'description': { 

            //returns old document which is after this changed 
            AccommodationAd.findOneAndUpdate({_id: idPost}, {description: valuePost}, (err, accommodationAd) =>
            {
                if (err)
                {
                    console.log("Greska pri izmeni oglasa");
                    console.log(err);
                    res.json({success: false, msg:'Greška pri izmeni oglasa za smeštaj', bodyOfResponse: null});
                }
                else
                {
                    res.json({success: true, msg:'Uspešno je izmenjen oglas za smeštaj', bodyOfResponse: accommodationAd});
                }
            });

           break; 
        } 
        case 'price': { 
            let valuePostNum = Number.parseFloat(valuePost);

            AccommodationAd.findOneAndUpdate({_id: idPost}, {price: valuePostNum}, (err, accommodationAd) =>
            {
                if (err)
                {
                    console.log("Greska pri izmeni oglasa");
                    console.log(err);
                    res.json({success: false, msg:'Greška pri izmeni oglasa za smeštaj', bodyOfResponse: null});
                }
                else
                {
                    res.json({success: true, msg:'Uspešno je izmenjen oglas za smeštaj', bodyOfResponse: accommodationAd});
                }
            });  
          break; 
       } 
       case 'typeOfAccommodation': { 
        
        AccommodationAd.findOneAndUpdate({_id: idPost}, {typeOfAccommodation: valuePost}, (err, accommodationAd) =>
        {
            if (err)
            {
                console.log("Greska pri izmeni oglasa");
                console.log(err);
                res.json({success: false, msg:'Greška pri izmeni oglasa za smeštaj', bodyOfResponse: null});
            }
            else
            {
                res.json({success: true, msg:'Uspešno je izmenjen oglas za smeštaj', bodyOfResponse: accommodationAd});
            }
        });  
      break; 
    } 
    case 'typeOfService': { 
            
        AccommodationAd.findOneAndUpdate({_id: idPost}, {typeOfService: valuePost}, (err, accommodationAd) =>
        {
            if (err)
            {
                console.log("Greska pri izmeni oglasa");
                console.log(err);
                res.json({success: false, msg:'Greška pri izmeni oglasa za smeštaj', bodyOfResponse: null});
            }
            else
            {
                res.json({success: true, msg:'Uspešno je izmenjen oglas za smeštaj', bodyOfResponse: accommodationAd});
            }
        });  
        break; 
        } 
        case 'equipment': { 
            
            AccommodationAd.findOneAndUpdate({_id: idPost}, {equipment: valuePost}, (err, accommodationAd) =>
            {
                if (err)
                {
                    console.log("Greska pri izmeni oglasa");
                    console.log(err);
                    res.json({success: false, msg:'Greška pri izmeni oglasa za smeštaj', bodyOfResponse: null});
                }
                else
                {
                    res.json({success: true, msg:'Uspešno je izmenjen oglas za smeštaj', bodyOfResponse: accommodationAd});
                }
            });  
        break; 
        } 
        
        default: { 
            break; 
        } 
    } 
});

router.delete('/productAd/delete', (req, res) => {

    let idGet = req.query.id;

    ProductAd.deleteOne({_id: idGet}, (err, productAd) =>
    {
        if (err)
        {
            console.log("Greska pri brisanju oglasa iz baze");
            console.log(err);
            res.json({success: false, msg:'Greška pri brisanju oglasa za proizvod iz baze', bodyOfResponse: null});
        }
        else
        {
            res.json({success: true, msg:'Uspešno je obrisan oglas za proizvod', bodyOfResponse: productAd});
        }
    });
});

router.delete('/accommodationAd/delete', (req, res) => {

    let idGet = req.query.id;

    AccommodationAd.deleteOne({_id: idGet}, (err, accommodationAd) =>
    {
        if (err)
        {
            console.log("Greska pri brisanju oglasa iz baze");
            console.log(err);
            res.json({success: false, msg:'Greška pri brisanju oglasa za smeštaj iz baze', bodyOfResponse: null});
        }
        else
        {
            res.json({success: true, msg:'Uspešno je obrisan oglas za smeštaj', bodyOfResponse: accommodationAd});
        }
    });
});

router.post('/add/productAd', upload.single('fileToUpload'), (req, res) => {

    // console.log("FAJL");
    // console.log(req.file);
    // console.log("req.body");
    // console.log(req.body);
   

    let ad = JSON.parse(req.body.ad);
    
    // fs.rename('./uploads/ads/' + req.file.filename,'./uploads/ads/' +  ad.nameOfAd + ".jpg", function(err) {
    //     if ( err ) console.log('ERROR: ' + err);
    // });

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    if(pictureOfAdProduct==true)
    {
        
        let newAd = new ProductAd({
            nameOfAd: ad.nameOfAd, 
            ownerUsername: ad.ownerUsername,
            typeOfProduct: ad.typeOfProduct,
            price: ad.price,
            structureOfProduct: ad.structureOfProduct,
            weight: ad.weight,
            description: ad.description,
            pictureOfAd:  req.protocol + "://" + req.get("host") +"/uploads/ads/" +  req.file.filename,
            dateOfPost: today
        });
    
        //check if ad with same nameOfAd exists in DB, and if not, save new ad in DB
        ProductAd.findOne({ nameOfAd: ad.nameOfAd }).exec(  (err, ad) => {

        if (err) 
        {
            res.status(400).json({success: false, msg: err});
            console.log(err);
        } 
        else 
        if (ad !== null) {
            res.status(400).json({success: false, msg: 'Oglas sa tim imenom već postoji u bazi'});
        } else
        {
            newAd.save((err, ad) => {
                if(err){
                    res.json({success: false, msg:'Oglas za proizvod nije unet u bazu, postoji greška.'});
                } else {
                    res.json({success: true, msg:'Oglas za proizvod je uspešno unet u bazu'});
                }
            });

        }
    });
    }
       
    
});

router.post('/add/accommodationAd', upload.single('fileToUpload'), (req, res) => {

    // console.log("FAJL");
    // console.log(req.file);
    // console.log("req.body");
    // console.log(req.body);
   
    
    let ad = JSON.parse(req.body.ad);
    
    // fs.rename('./uploads/ads/' + req.file.filename,'./uploads/ads/' +  ad.nameOfAd + ".jpg", function(err) {
    //     if ( err ) console.log('ERROR: ' + err);
    // });

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    if(pictureOfAdAccommodation==true)
    {
        
        let newAd = new AccommodationAd({
            nameOfAd: ad.nameOfAd, 
            ownerUsername: ad.ownerUsername,
            destination: ad.destination,
            typeOfAccommodation: ad.typeOfAccommodation,
            typeOfService: ad.typeOfService,
            equipment: ad.equipment,
            price: ad.price,
            description: ad.description,
            pictureOfAd:  req.protocol + "://" + req.get("host") +"/uploads/ads/" + req.file.filename,
            dateOfPost: today
        });
    
        //check if ad with same nameOfAd exists in DB, and if not, save new ad in DB
        AccommodationAd.findOne({ nameOfAd: ad.nameOfAd }).exec(  (err, ad) => {

        if (err) 
        {
            res.status(400).json({success: false, msg: err});
            console.log(err);
        } 
        else 
        if (ad !== null) {
            res.status(400).json({success: false, msg: 'Oglas sa tim imenom već postoji u bazi'});
        } else
        {
            newAd.save((err, ad) => {
                if(err){
                    res.json({success: false, msg:'Oglas za smeštaj nije unet u bazu, postoji greška.'});
                } else {
                    res.json({success: true, msg:'Oglas za smeštaj je uspešno unet u bazu'});
                }
            });

        }
    });
    }
       
    
});

module.exports = router;