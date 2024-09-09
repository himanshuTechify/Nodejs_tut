const express = require('express');

const app = express();

app.use('/', (req,res,next) => {
    console.log("middleware");
    next();
}, (req,res) => {
    res.send( `<div> <h3> Tutorials </h3> </div>`)
})


app.listen( 6000, () => {
    console.log("server has started");
})