const express = require('express');
const User = require('../models/User');
const router = express.Router();
var sha1 = require('sha1');

//ovde idu get i post metode 

router.post('/',  (req, res) => {
  
    
    let usernameGet = req.body.username;
    let passwordGet = req.body.password;

    User.findOne({ username: usernameGet }, (err, user) =>
    {

        if (err || user==null)
        {
           // console.log("Korisnik sa unetim parametrima ne postoji");
            if(err!=null) console.log(err);
            res.status(400).json({success: false, msg:'Korisnik nije pronađen!', body: null});
        }
        else
        {
            if(user.password==sha1(passwordGet))
            {
                res.status(200).json({success: true, msg:'Korisnik je pronađen!', body: user.toObject()});
            }
            else
            {
                res.status(400).json({success: false, msg:'Šifra se ne slaže!', body: null});
            }
            
        }
    });
});



router.post('/change-password',  (req, res) => {

    
    let usernameGet = req.body.username;
    let newPasswordGet = req.body.newPassword;
    let isAdmin = false;

    User.findOne({username: usernameGet},  (err, user) =>
    {
        if (err)
        {
            console.log("Greška pri promeni lozinke korisniku sa unetim korisničkim imenom u bazi");
            console.log(err);
            res.json({success: false, msg:'Greška pri promeni lozinke korisniku sa unetim korisničkim imenom u bazi', bodyOfResponse: null});
        }
        else
        {
            if(user!=null)
            {
                if(user.typeOfUser!="admin")
                {
                    //user found in DB and user type is admin -> admin can not change his pass -> throw error
                    isAdmin=true;
                    User.findOneAndUpdate({username: usernameGet}, {password: sha1(newPasswordGet)}, (err, user) =>
                    {
                        if (err)
                        {
                            console.log("Greška pri promeni lozinke korisniku sa unetim korisničkim imenom u bazi");
                            console.log(err);
                            res.json({success: false, msg:'Greška pri promeni lozinke korisniku sa unetim korisničkim imenom u bazi', bodyOfResponse: null});
                        }
                        else
                        {
                            if(user==null)
                            {
                                console.log("Greška pri promeni lozinke: korisnik sa unetim korisničkim imenom ne postoji u bazi");
                                console.log(err);
                                res.json({success: false, msg:'Greška pri promeni lozinke: korisnik sa unetim korisničkim imenom ne postoji u bazi', bodyOfResponse: null});
                            }
                            else
                                res.json({success: true, msg:'Uspešno je promenjena lozinka korisniku sa unetim korisničkim imenom', bodyOfResponse: user});
                        }
                    });
                }
                else
                {
                    console.log("Greška pri promeni lozinke: korisnik admin ne može da menja svoju lozinku");
                    console.log(err);
                    res.json({success: false, msg:'Greška pri promeni lozinke: korisnik admin ne može da menja svoju lozinku', bodyOfResponse: null});
                }
               
            }
               
        }
    });
});


router.post('/fetchUser',  (req, res) => {

    
    let usernameGet = req.body.username;

    User.findOne({username: usernameGet},  (err, user) =>
    {
        if (err)
        {
            console.log("Greška pri pregledu profila: greška pri pretrazi korisnika sa korisničkim imenom" + usernameGet);
            console.log(err);
            res.json({success: false, msg:"Greška pri pregledu profila: greška pri pretrazi korisnika sa korisničkim imenom" + usernameGet, bodyOfResponse: null});
        }
        else
        {
            if(user!=null)
            {
                res.json({success: true, msg:'Uspešno su dohvaćene informacije o traženom korisniku za pregled profila', bodyOfResponse: user});
            }
            else
            {
                res.json({success: false, msg:"Greška pri pregledu profila: ne postoji korisnik sa korisničkim imenom " + usernameGet, bodyOfResponse: null});
            }
               
        }
    });
});


router.post('/updateUserProfile',  (req, res) => {

    
    let usernamePost = req.body.username;
    let propertyPost = req.body.property;
    let valuePost = req.body.value;

    switch(propertyPost) { 
        case 'name': { 
            //returns old document which is after this changed 
            User.findOneAndUpdate({username: usernamePost}, {name: valuePost},{new: true}, (err, user) =>
            {
                if (err)
                {
                    console.log("Greska pri izmeni polja ime");
                    console.log(err);
                    res.json({success: false, msg:'Greška pri izmeni polja ime', bodyOfResponse: null});
                }
                else
                {
                    res.json({success: true, msg:'Uspešno je izmenjeno polje ime profila', bodyOfResponse: user});
                }
            });

           break; 
        } 
        case 'surname': { 
            
            User.findOneAndUpdate({username: usernamePost}, {surname: valuePost}, {new: true}, (err, user) =>
            {
                if (err)
                {
                    console.log("Greska pri izmeni polja prezime");
                    console.log(err);
                    res.json({success: false, msg:'Greška pri izmeni polja prezime', bodyOfResponse: null});
                }
                else
                {
                    res.json({success: true, msg:'Uspešno je izmenjeno polje prezime profila', bodyOfResponse: user});
                }
            });
          break; 
       } 
       case 'email': { 

        User.findOneAndUpdate({username: usernamePost}, {email: valuePost},{new: true}, (err, user) =>
        {
            if (err)
            {
                console.log("Greska pri izmeni polja email");
                console.log(err);
                res.json({success: false, msg:'Greška pri izmeni polja email', bodyOfResponse: null});
            }
            else
            {
                res.json({success: true, msg:'Uspešno je izmenjeno polje email profila', bodyOfResponse: user});
            }
        });
      
      break; 
    } 
    case 'occupation': { 
        
        User.findOneAndUpdate({username: usernamePost}, {occupation: valuePost}, {new: true}, (err, user) =>
        {
            if (err)
            {
                console.log("Greska pri izmeni polja zanimanje");
                console.log(err);
                res.json({success: false, msg:'Greška pri izmeni polja zanimanje', bodyOfResponse: null});
            }
            else
            {
                res.json({success: true, msg:'Uspešno je izmenjeno polje zanimanje profila', bodyOfResponse: user});
            }
        });
        
        break; 
        } 
    case 'contactTelephone': { 

        User.findOneAndUpdate({username: usernamePost}, {contactTelephone: valuePost}, {new: true}, (err, user) =>
        {
            if (err)
            {
                console.log("Greska pri izmeni polja kontakt telefon");
                console.log(err);
                res.json({success: false, msg:'Greška pri izmeni polja kontakt telefon', bodyOfResponse: null});
            }
            else
            {
                res.json({success: true, msg:'Uspešno je izmenjeno polje kontakt telefon profila', bodyOfResponse: user});
            }
        });
       
    break; 
    } 
        
        default: { 
            break; 
        } 
    } 

});


module.exports = router;