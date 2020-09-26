const express = require('express');
const User = require('../models/User');
const Log = require('../models/Log');
const ProductAd = require('../models/ProductAd');
const AccommodationAd = require('../models/AccommodationAd');
const router = express.Router();
const multer = require('multer');
var fs = require('fs');
var path = require('path');

router.get('/productAdsForCheck', (req, res) => {

    ProductAd.find({approvedByAdmin: false}, (err, productAds) =>
    {
        if (err)
        {
            console.log("Greska pri dohvatanju svih oglasa proizvoda koji su na čekanju iz baze");
            console.log(err);
            res.json({success: false, msg:'Greška pri dohvatanju svih oglasa proizvoda koji su na čekanju iz baze', bodyOfResponse: null});
        }
        else
        {
           // console.log(productAds);
            res.json({success: true, msg:'Uspešno su dohvaćeni svi oglasi koji su na čekanju za proizvode', bodyOfResponse: productAds});
        }
    });
});



router.get('/accommodationAdsForCheck', (req, res) => {

    AccommodationAd.find({approvedByAdmin: false}, (err, accommodationAds) =>
    {
        if (err)
        {
            console.log("Greska pri dohvatanju svih oglasa koji su na čekanju za smeštaj iz baze");
            console.log(err);
            res.json({success: false, msg:'Greška pri dohvatanju svih oglasa za smeštaj koji su na čekanju iz baze', bodyOfResponse: null});
        }
        else
        {
            res.json({success: true, msg:'Uspešno su dohvaćeni svi oglasi koji su na čekanju za smeštaj', bodyOfResponse: accommodationAds});
        }
    });
});



router.get('/usersBuyers', (req, res) => {

    User.find({typeOfUser: 'buyer'}, (err, buyer) =>
    {
        if (err)
        {
            //console.log("Greska pri dohvatanju svih oglasa proizvoda koji su na čekanju iz baze");
            console.log(err);
            res.json({success: false, msg:'Greška pri dohvatanju svih kupaca iz baze', bodyOfResponse: null});
        }
        else
        {
           // console.log(productAds);
            res.json({success: true, msg:'Uspešno su dohvaćeni svi kupci iz baze', bodyOfResponse: buyer});
        }
    });
});


router.post('/approveProductAd', (req, res) => {


    let idGet = req.body.id;

    //atomic -> returns original  (not updated!!!) document
    //to return updated one just add  {new: true} after update

    ProductAd.findOneAndUpdate({_id: idGet}, {approvedByAdmin: true}, (err, productAd) =>
    {
        if (err)
        {
            console.log("Greska pri odobravanju proizvoda koji su na čekanju iz baze");
            console.log(err);
            res.json({success: false, msg:'Greška pri odobravanju oglasa proizvoda koji je na čekanju iz baze', bodyOfResponse: null});
        }
        else
        {
            res.json({success: true, msg:'Uspešno je odobren oglas za proizvod', bodyOfResponse: productAd});
        }
    });
});

router.post('/approveAccommodationAd',  (req, res) => {

    
    let idGet = req.body.id;

    //atomic -> returns original  (not updated!!!) document
    //to return updated one just add  {new: true} after update

     AccommodationAd.findOneAndUpdate({_id: idGet}, {approvedByAdmin: true}, (err, accommodationAd) =>
    {
        if (err)
        {
            console.log("Greska pri odobravanju oglasa za smeštaj koji su na čekanju iz baze");
            console.log(err);
            res.json({success: false, msg:'Greška pri odobravanju oglasa za smeštaj koji je na čekanju iz baze', bodyOfResponse: null});
        }
        else
        {
            res.json({success: true, msg:'Uspešno je odobren oglas za smeštaj', bodyOfResponse: accommodationAd});
        }
    });
});


router.delete('/declineProductAd', (req, res) => {

    let idGet = req.query.id;

    ProductAd.deleteOne({_id: idGet}, (err, productAd) =>
    {
        if (err)
        {
            console.log("Greska pri odbacivanju proizvoda koji je na čekanju");
            console.log(err);
            res.json({success: false, msg:'Greška pri odbacivanju oglasa proizvoda koji je na čekanju', bodyOfResponse: null});
        }
        else
        {
            res.json({success: true, msg:'Uspešno je odbačen oglas za proizvod', bodyOfResponse: productAd});
        }
    });
});

router.delete('/declineAccommodationAd', (req, res) => {

    let idGet = req.query.id;

    AccommodationAd.deleteOne({_id: idGet}, (err, productAd) =>
    {
        if (err)
        {
            console.log("Greska pri odbacivanju proizvoda koji je na čekanju");
            console.log(err);
            res.json({success: false, msg:'Greška pri odbacivanju oglasa smeštaja koji je na čekanju', bodyOfResponse: null});
        }
        else
        {
            res.json({success: true, msg:'Uspešno je odbačen oglas za smeštaj', bodyOfResponse: productAd});
        }
    });
});

router.post('/messages', (req, res) => {

    let adminUsernamePost = req.body.adminUsername;
    let buyerUsernamePost = req.body.buyerUsername;

    Log.find({admin: adminUsernamePost, buyer: buyerUsernamePost}, (err, logs) =>
    {
        if (err)
        {
            console.log(err);
            res.json({success: false, msg:'Greška pri dohvatanju poruka iz baze', bodyOfResponse: null});
        }
        else
        {
           // console.log(productAds);
            res.json({success: true, msg:'Uspešno su dohvaćene sve poruke za traženu konverzaciju', bodyOfResponse: logs});
        }
    });
});


router.post('/saveConversation', (req, res) => {

    let adminUsernamePost = req.body.adminUsername;
    let buyerUsernamePost = req.body.buyerUsername;
    let messages = req.body.messages;
    let dateAndTimeOfStart = req.body.dateAndTimeOfStart;
    let dateAndTimeOfEnd = new Date();


    // let newLog = new Log({
    //     admin: adminUsernamePost, 
    //     buyer: buyerUsernamePost,
    //     dateAndTimeOfStart: dateAndTimeOfStart,
    //     dateAndTimeOfEnd: dateAndTimeOfEnd,
    //     messages: messages
    // });

    // newLog.save((err, user) => {
    //     if(err){
    //         res.json({success: false, msg:'Log nije dodat u bazu, postoji greška.'});
    //     } else {
    //         res.json({success: true, msg:'Log je dodat uspešno u bazu'});
    //     }
    // });

    Log.findOneAndUpdate({admin: adminUsernamePost, buyer: buyerUsernamePost, messages:null, dateAndTimeOfEnd: null}, {
        messages: messages, dateAndTimeOfEnd:dateAndTimeOfEnd}, (err, logs) =>
    {
        if (err)
        {
            console.log(err);
            res.json({success: false, msg:'Greška pri dohvatanju poruka iz baze', bodyOfResponse: null});
        }
        else
        {
           // console.log(productAds);
            res.json({success: true, msg:'Uspešno su dohvaćene sve poruke za traženu konverzaciju', bodyOfResponse: logs});
        }
    });
});

module.exports = router;