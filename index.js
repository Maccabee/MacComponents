const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '')));

app.listen(3000, () => {
    const port = this.address().port;
    console.log('server listening at port %s', port);
});
