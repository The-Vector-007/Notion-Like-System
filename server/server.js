const express = require('express');
const app = express();
const PORT = 4000;
const http = require("http").Server(app);
const cors = require("cors");
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('disconnect', () => {
      socket.disconnect()
      console.log('🔥: A user disconnected');
    });
});

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());

app.get('/app', (req, res) => {
    res.json("Hello")
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})