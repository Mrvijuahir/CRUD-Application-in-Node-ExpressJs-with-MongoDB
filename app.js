const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/conn');


const app = express();
dotenv.config({path:'config.env'});

// log request
app.use(morgan('tiny'));

// MongoDB Connection

connectDB();

// body-parser
app.use(bodyparser.urlencoded({extended:true}));

// set view engine

app.set("view engine","ejs");
// app.set("views",path.resolve(__dirname,"views/ejs"))

// load assests
app.use('/css',express.static(path.resolve(__dirname,"public/css")));
app.use('/js',express.static(path.resolve(__dirname,"public/js")));

const PORT = process.env.PORT
// load routers 
app.use("/",require('./server/routes/router'));


app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})