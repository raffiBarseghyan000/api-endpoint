const express = require('express');
const app = express();
const http = require('http').Server(app);
const socketio = require('socket.io')(http);
app.set('socketio', socketio);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const defaultSchema = require('./schemas/defaultSchema');

const port = process.env.port || 9999;

app.post('/', async (req, res)=> {
    const schemaObject = new defaultSchema(req.body)
    console.log(req.body)
    await schemaObject.save()
    res.status(200).send('insertion completed')
})

app.get('/', async (req, res)=> {
    res.status(200).json(await defaultSchema.find({}, {_id: false, __v: false}))
})

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