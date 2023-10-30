require('dotenv').config();
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors")

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,      // where is our frontend hosted
        methods: ["GET", "POST"],              // requests allowed
    }
});

// listens for "connection event"
io.on("connection", (socket) => {
    console.log(`Connected to: ${socket.id}`);

    // now after the connection is established, now we listen on socket from any events
    // this socket is specific to 1 user
    socket.on("send_message", (data) => {
        // now broadcast this message to other users
        // socket.broadcast.emit("receive_message", data);
        console.log(`"message received: ${data.message} from room: ${data.room}`);
        socket.to(data.room).emit("receive_message", {message: data.message});
    });

    socket.on("join_room", (data) => {
        console.log(`${socket.id} joined to room: ${data.room}`);
        socket.join(data.room);
    });
});

server.listen(process.env.PORT, ()=> {
    console.log("Server is runnung at " + process.env.PORT);
});