
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose =  require('mongoose');
const path = require('path');

const User = require('./models/User');
const Log = require('./models/Log');

const connection = mongoose.connection;

mongoose.connect('mongodb://localhost:27017/upoznajSrbiju', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

mongoose.connection.on('connected', () => {
    console.log('Connected to database '+ 'mongodb://localhost:27017/upoznajSrbiju');
});

mongoose.connection.on('error', (err) => {
    console.log('Database error: '+err);
});

const app = express();
const server = http.Server(app);
var io = require('socket.io')(server);

var users = {};
var adminFreeQueue = [];
var adminUser = {};

io.on('connection', function(socket) {
    
    console.log('new user detected!');

    socket.on('setSocketId', function(data) {
      var username = data.username;
      var id = data.id;
      users[username] = id;

      //put user in queue if he is admin
      User.findOne({username: username}, (err, user) => {

        if (err || user==null)
        {
          if(err!=null) console.log(err); 
        }
        else
        {
          if(user.typeOfUser=='admin')
          {
            console.log("Korisnik sa korisničkim imenom: " + user.username + " je dodat u red slobodnih admina");
            adminFreeQueue.push(user);
          }
        }
      });
    });

    socket.on('admin-is-free', (messageObject) => {
      let admin = messageObject.admin;
      adminFreeQueue.push(admin); 
      console.log("Dodajem admina sa username: ", admin.username);
      console.log("Slobodni admini: ", adminFreeQueue);

      for(var adminKey in adminUser)
      { 
        if(adminKey==admin.username)
        {
          delete adminUser[adminKey];
          break;
        }
      }
    });


    socket.on('new-message', (messageObject) => {
     

      //server salje poruku svima, pa  i onome ko ju je poslao
      // io.emit('new-message', messageObject);
     
      //primi poruku new message od kupca i salje je adminu
      // console.log("Primljena poruka na serveru");
      // console.log(messageObject.to);

      if(messageObject.from.typeOfUser=='buyer')
      {
        //ako poruku salje buyer i ako mu je to prva poruka 
        var valuesOfUsersInConversations = Object.values(adminUser);
      
        if(valuesOfUsersInConversations.includes(messageObject.from.username))
        {
          //korisniku buyeru je vec dodeljen admin za pricu, treba da se nadje koji je njegov user

          for(var admin in adminUser)
          {
            if(adminUser[admin]==messageObject.from.username)
            {
              io.sockets.sockets[users[admin]].emit("new-message", messageObject);
              socket.emit("new-message", messageObject); 
              break;
            }
          }
         
        }
        else
        {
          //pronadji slobodnog admina za odgovor ili mu uzvrati poruku da ga nema
          console.log("slobodni admini su: ", adminFreeQueue);
          if (adminFreeQueue.length == 0)
          {
            //nema slobodnih admina, vrati mu poslatu poruku i poruku obavestenja
            socket.emit("new-message", messageObject);
            socket.emit("new-message", {message: 'Trenutno nema slobodnih admina. Pokušajte ponovo malo kasnije', from: null , to: messageObject.from});

          }
          else
          {
            //izvadi slobodnog admina iz queue-a
            let freeAdmin = adminFreeQueue.shift();
            //console.log("izvadjen free admin je ", freeAdmin);
            adminUser[freeAdmin.username] = messageObject.from.username;

            //upisi u bazu informacije o zapocetoj konverzaciji
            let dateOfStart = new Date();
            let newLog = new Log({
              admin: freeAdmin.username, 
              buyer: messageObject.from.username,
              dateAndTimeOfStart: dateOfStart,
              dateAndTimeOfEnd: null,
              messages: null
            });
      
            newLog.save((err, user) => {
                if(err){
                    //res.json({success: false, msg:'Log nije dodat u bazu, postoji greška.'});
                    console.log("Greška prilikom upisa nove konverzacije u bazu!");
                }
            });

            //prosledi poruku slobodnom adminu i prikazi poslatu poruku buyer-u
            io.sockets.sockets[users[freeAdmin.username]].emit("new-message", messageObject);
            socket.emit("new-message", messageObject); 
          }
        }

        
      }
      else
      {
        //ako poruku salje admin
        if(messageObject.to)
        {
          //proveri da li je dodeljeni kupac i dalje u konverzaciji 
          var valuesOfUsersInConversations = Object.values(adminUser);

          if(valuesOfUsersInConversations.includes(messageObject.to))
          {
            //ako jeste, nastavi normalno konverzaciju
            io.sockets.sockets[users[messageObject.to]].emit("new-message", messageObject);
            socket.emit("new-message", messageObject);
          }
          else
          {
            //ako nije, posalji genericku poruku adminu da zna da zavrsi konverzaciju
            socket.emit("new-message", messageObject);
            socket.emit("new-message", {message: 'Korisnik kupac nije vise aktivan. Mozete zavrsiti konverzaciju', from: null , to: messageObject.from});
          }
        }
        
      }
    });

    socket.on('disconnect', function() {

      console.log('user gone');

      var valuesOfSocketsID = Object.values(users);
      

      if(valuesOfSocketsID.includes(socket.id))
      {
       
        for(var key in users)
        {
          if(users[key]==socket.id)
          {
            //proveri da li je izasao admin
            let usernameOfSomeUser = key; 

            User.findOne({username: usernameOfSomeUser}, (err,user) => {

              if (user)
              {
                
                if (user.typeOfUser=='admin')
                {

                  var found = false;
                  for(var i = 0; i < adminFreeQueue.length; i++) {
                    
                      if (adminFreeQueue[i].username == user.username) {

                          //admin koji napusta je slobodan
                          //izbrisi ga iz niza
                          //console.log("adminFreeQueue pre brisanja", adminFreeQueue);
                          adminFreeQueue.splice(i,1);
                          //console.log("adminFreeQueue psole brisanja", adminFreeQueue);
                          found = true;
                          break;
                      }
                  }

                  if (found==false)
                  {
                    //TO DO!!!!!!
                    //admin koji napusta je zauzet, konverzacija je u toku, 
                    //izbrisi ga iz objekta adminUser da oznacis da ta konverzacija nije u toku
                    delete adminUser[user.username];
                  }
                }
                else
                if(user.typeOfUser=='buyer')
                {
                  //proveri da li je konverzacija sa mnom u toku
                  //ako jeste, obavesti admina da treba da zavrsi komunikaciju

                  for(var admin in adminUser)
                  { 
                    if(adminUser[admin]==user.username)
                    {
                      //konverzacija je u toku
                      delete adminUser[admin];
                      break;
                    }
                  }
                }
              }

            });

            delete users[key];
          }
        }
      }

      //ako user koji je admin izadje dok traje ko
      
    });
});


server.listen(4444);

const router = express.Router();

app.use(cors());
app.use('/uploads/profilePictures/', express.static('uploads/ProfilePictures/'));
app.use('/uploads/ads', express.static('uploads/ads'));

app.use(bodyParser.json());
app.use("/registration", require("./routes/registration"));
app.use("/login", require("./routes/login"));
app.use("/choose-for-me", require("./routes/choose-for-me"));
app.use("/seller", require("./routes/seller"));
app.use("/admin", require("./routes/admin"));

app.use('/', router);



app.use(express.static('./build'));
app.listen(4000, () => console.log('Express server running on port 4000'));

// io.connection('connection',socket => {
//     socket.emit('chat-message', 'Hello world');
// })


