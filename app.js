const crypto = require('crypto');
const QRcode = require('qrcode');
const app = require('express')();
const http = require('http').Server(app);
const path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/qr', function(req, res) {
    let id = crypto.randomBytes(16).toString('hex');

    QRcode.toDataURL(id, (err, url) => {
    res.send(url);
    });
});

const port = 8080;

http.listen(port, function() {
    console.log('listening on ' + port);
})