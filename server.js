//we will create our server
const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const inscription1Routes = require('./routes/inscription1');
const inscription2Routes = require('./routes/inscription2');
const loginEmpRoutes = require('./routes/loginEmp');
const profileRoutes = require('./routes/profile');
const offersRoutes = require('./routes/offers');

dotenv.config();
//a connection into our database to

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true , useUnifiedTopology: true})
    .then(()=>{
        console.log('a connection to DB has been established');
    })
    .catch((error)=>{
        console.log({
            message: "no connection to DB has been established",
            error: error
        })
    })


//ejs
app.set('view engine','ejs');
app.use(express.static(__dirname + '/views'));

// middlewares

app.use(bodyParser.json());
app.use( bodyParser.urlencoded({ extended: true }));
app.use('/home',inscription1Routes);
app.use('/',inscription2Routes);
app.use('/loginEmp',loginEmpRoutes);
app.use('/user',profileRoutes);
app.use('/user',offersRoutes);


const server = http.createServer(app);

server.listen(3000,(error)=>{
    console.log(`we are listening to ${3000}`);
})