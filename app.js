const crypto = require('crypto');
const QRcode = require('qrcode');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

let id;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/qr', function(req, res) {
    let id = crypto.randomBytes(16).toString('hex');

    QRcode.toDataURL(id, (err, url) => {
    res.send(url);
    });
});

app.get('/validateqr/:id', function(req, res) {
    if (!id) {
        res.send('wait in line. no id yet');
    }
    else {
        if (id == req.params.id) {
            res.send('you are validated');
        }
        else {
            res.send('nice try. get out');
        }
    }
});

io.on('connection', function(socket) {
    console.log('oh look a user!!');

    function sendQR() {
        id = crypto.randomBytes(8).toString('hex');

        QRcode.toDataURL(id, (err, url) => {
            socket.emit('qrcode', url);
        });
    }

    setInterval(sendQR, 10000);
});

const port = 8080;

http.listen(port, function() {
    console.log('listening on ' + port);
})