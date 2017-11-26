var express = require('express');
var app = express();
var port = process.env.PORT || 8001;

app.listen(port, function(){
    console.log('Starting Server 8001')
});