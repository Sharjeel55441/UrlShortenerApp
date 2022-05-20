const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyparser = require('body-parser');
const UrlRouter = require('./routes/router');
const rateLimit = require("express-rate-limit");
const dotenv = require('dotenv')
dotenv.config({path:'.env'});
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(
    rateLimit({
      windowMs:1000, 
      max: 5,
      message: "You exceeded 5 requests in 1 second limit!",
      headers: true,
    })
  );
//*****Routes*********//
app.use('/api',UrlRouter)

var PORT = process.env.PORT;
mongoose
.connect( process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then((result) => {
    app.listen(PORT, () => {
        console.log(`app listening: ${PORT}`)
    })
}).catch((err) => {
    console.log("[App.mongoose]".red, err)
})