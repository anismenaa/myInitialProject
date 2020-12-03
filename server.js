//we will create our server
const http = require('http');
const app = require('express')();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const inscription1Routes = require('./routes/inscription1');
const inscription2Routes = require('./routes/inscription2');

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



// middlewares
app.use(bodyParser.json());
app.use('/home',inscription1Routes);
app.use('/guest',inscription2Routes);

const server = http.createServer(app);

server.listen(3000,(error)=>{
    console.log(`we are listening to ${3000}`);
})