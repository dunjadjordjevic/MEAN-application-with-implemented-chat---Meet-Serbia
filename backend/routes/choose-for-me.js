const express = require('express');
const ProductAd = require('../models/ProductAd');
const AccommodationAd = require('../models/AccommodationAd');
const router = express.Router();


router.get('/productAds', (req, res) => {

    ProductAd.find({approvedByAdmin: true}, (err, productAds) =>
    {
        if (err)
        {
            console.log("Greska pri dohvatanju svih oglasa proizvoda iz baze");
            console.log(err);
            res.json({success: false, msg:'Greška pri dohvatanju svih oglasa proizvoda iz baze', bodyOfResponse: null});
        }
        else
        {
           // console.log(productAds);
            res.json({success: true, msg:'Uspešno su dohvaćeni svi oglasi za proizvode', bodyOfResponse: productAds});
        }
    });
});



router.get('/accommodationAds', (req, res) => {

    AccommodationAd.find({approvedByAdmin: true}, (err, accommodationAds) =>
    {
        if (err)
        {
            console.log("Greska pri dohvatanju svih oglasa za smeštaj iz baze");
            console.log(err);
            res.json({success: false, msg:'Greška pri dohvatanju svih oglasa za smeštaj iz baze', bodyOfResponse: null});
        }
        else
        {
            res.json({success: true, msg:'Uspešno su dohvaćeni svi oglasi za smeštaj', bodyOfResponse: accommodationAds});
        }
    });
});

module.exports = router;