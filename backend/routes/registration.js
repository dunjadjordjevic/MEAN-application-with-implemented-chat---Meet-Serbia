const express = require('express');
const User = require('../models/User');
const router = express.Router();
const multer = require('multer');
var fs = require('fs');
var path = require('path');
var sha1 = require('sha1');

var profilePictureOK=false;

const fileFilter = (req, file, cb) => {
   
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    {
        //check if there is same picture in uploads/profilePictures/
        //OVDE MORA UMESTO FILE.ORIGINALNAME, ZAPRAVO USER.USERNAME
        fs.stat('./uploads/profilePictures/' + file.originalname , function(err) {
            if (!err) {
                console.log('file or directory exists');
                cb(null, false);
                profilePictureOK=false;
            }
            else 
            if (err.code === 'ENOENT') {
                //console.log('file or directory does not exist');
                //file has been saved
                cb(null, true);
                profilePictureOK=true;
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
        cb(null, './uploads/profilePictures/');
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

router.get('/users', (req, res) => {
    User.find({}, (err, users) =>
    {
        if (err)
        {
            console.log("Greska pri dohvatanju svih korisnika iz baze");
            console.log(err);
        }
        else
        {
            res.json(users);
        }
    });
});



//registration/register_user
router.post('/register_user', upload.single('profilePicture'), (req, res) => {

   
    //informacije o file-u: console.log(req.file);
    // console.log("informacije o fajlu");
    // console.log(req.file);

    let user = JSON.parse(req.body.user);
    fs.rename('./uploads/profilePictures/' + req.file.filename,'./uploads/profilePictures/' +  user.username + ".jpg", function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });


    if(user.username === undefined) 
    {
        res.status(400).json("Parametar korisničko ime nedostaje!");
    }
    else
    {
        if(profilePictureOK==true)
        {
            let newUser = new User({
                name: user.name, 
                surname: user.surname,
                email: user.email,
                occupation: user.occupation,
                contactTelephone: user.contactTelephone,
                username: user.username,
                password: sha1(user.password),
                gender: user.gender,
                typeOfUser: user.typeOfUser,
                profilePicture:  req.protocol + "://" + req.get("host") +"/uploads/profilePictures/" + user.username
            });
        
            //check if user with same username exists in DB, and if not, save new user in DB
            User.findOne({ username: user.username }).exec(  (err, user) => {
    
            if (err) 
            {
                res.status(400).json(err);
                console.log(err);
            } 
            else 
            if (user !== null) {
                res.status(400).json("Korisnik već postoji u bazi.");
            } else
            {
                newUser.save((err, user) => {
                    if(err){
                        res.json({success: false, msg:'Korisnik nije registrovan, postoji greška.'});
                    } else {
                        res.json({success: true, msg:'Korisnik je registrovan'});
                    }
                });
    
            }
        });
        }
        else
        {
            res.status(400).json("Korisnik već postoji u bazi."); 
        } 
    }
});



module.exports = router;