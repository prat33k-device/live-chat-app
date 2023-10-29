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

server.listen(process.env.PORT, ()=> {
    console.log("Server is runnung at " + process.env.PORT);
});