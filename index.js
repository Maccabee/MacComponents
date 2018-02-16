const express = require('express');
const path = require('path');
const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: '.' });
});

app.listen(3000, function () {
    const port = this.address().port;
    console.log('server listening at port %s', port);
});
