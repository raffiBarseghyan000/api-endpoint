const express = require('express');
const app = express();
const http = require('http').Server(app);
const socketio = require('socket.io')(http);
const checkToken = require('./tokenUtil')
app.set('socketio', socketio);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

const port = process.env.app_port || 9999;

app.get('/', function(req, res) {
    res.sendFile( process.cwd() + '/public/pages/login.html')
})

app.use('/login', require('./routes/login.js'))

app.use('/entries', checkToken, require('./routes/entries.js'))

app.use('/users', checkToken, require('./routes/users.js'))

app.use((req, res) => {
    res.status(404).send('Invalid request');
})

app.use((err, req, res) => {
    socketio.emit('Error', err.message);
    res.status(500).send(err.message);
})

socketio.on('connect', () => {
    console.log('Someone connected');
})

http.listen(port, () => {
    console.log('Server is running...');
})