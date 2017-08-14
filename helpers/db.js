const url = 'mongodb://localhost:27017/light_css'
var mongoose = require('mongoose');
mongoose.connect(url);

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function(callbak) {
    console.log('db.connected')
})