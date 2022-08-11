const express = require("express");
const socketio = require("socket.io");
const fs = require("fs");

const app = express();

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(PORT, "server running");
});

const io = socketio(server);

app.get("/", (req, res) => {
  fs.readFile("index.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

const userId = [];
const userName = [];

io.on("connection", (socket) => {
  console.log("user 접속");
  console.log(socket.id);

  socket.on("enroll", (name, id) => {
    userId.push(id);
    userName.push(name);
    io.emit("enroll", userId, userName);
  });

  socket.on("room_join", (room, name) => {
    socket.join(room);
    io.to(room).emit("room_join", room, name);
  });

  socket.on("room_leave", (room, name) => {
    socket.leave(room);
    io.to(room).emit("room_leave", room, name);
  });

  socket.on("chat", (room, name, msg) => {
    io.to(room).emit("chat", room, name, msg);
  });
  socket.on("secretTo", (user, name, msg) => {
    io.to(user).emit("secretTo", user, name, msg);
  });
  socket.on("secretFrom", (user, name, msg) => {
    socket.emit("secretFrom", user, name, msg);
  });
});
