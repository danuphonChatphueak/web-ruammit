const express = require('express');
const app = express();
const socketio = require('socket.io')
const path = require('path');
const mysql = require('mysql');

/* app.set('view engine', 'ejs'); */
app.use(express.static('app'));


app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, "app", "home.html"));
});

const server = app.listen(5000,() => {
    console.log('Server is running on port 5000');
});
/* 
const io = socketio(server);

io.on("connection", socket => {
    console.log("New user connected");

    socket.username = "anonymous"

    socket.on("change_username", data => {
        socket.username = data.username
    })

    socket.on("new_message", data => {
        console.log("new messsage");
        io.sockets.emit("receive_message", { message: data.message, username: socket.username })
    })

    socket.on('typing', data => {
        socket.broadcast.emit('typing', { username: socket.username })
    })

});  */

/* const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '26950Pai!',
    database: 'testdb'
});

db.connect((err) => {
    if(err){
        console.log('error wa kub',err);
        return;
    }
    else{
        console.log('connect wa pee');
    }

}); 

app.use(express.static(path.join(__dirname, "app")))
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, './app/home.html'));
});

app.get('/', (req, res) => {
    db.query('SELECT * FROM user', (err, results) => {
        if (err) {
            res.status(500).send('เกิดข้อผิดพลาดในการดึงข้อมูล');
            return;
        }
        res.send(results);
    });
}); */

