//====================
// *****REQUIRES****
//====================
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
module.exports.io = socketIO(server);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;


app.use(express.static(publicPath));
require('./sockets/socket');


server.listen(port, (err) => {    
    if (err) throw new Error(err);
    
    console.log(`Servidor corriendo en puerto ${ port }`);
});