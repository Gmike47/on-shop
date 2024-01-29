const express = require('express');
const app = express();
const loaders = require('./loaders');
const { PORT } = require('./config');

async function startServer() {
    loaders(app);

    app.listen(Port, () => {
        console.log(`Listening on port ${PORT}`);
    })
}

startServer();