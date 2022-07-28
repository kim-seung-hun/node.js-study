// 채팅방 만들기(socket.io)
// 방개념

// 사용할 모듈
// express, socket.io, fs, nodemon

const express = require("express");
const socketio = require("socket.io");
const fs = require("fs");

// 서버의 몸체가 될 객체 만들기
const app = express();

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(PORT, "server open");
});

const io = socketio(server);
// /socket.io/socket.io.js 이 경로로 js 파일에 접근할수 있다.

app.get("/", (req, res) => {
  fs.readFile("page.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

// 클라이언트가 접속했을때 connection
io.on("connection", (socket) => {
  console.log(socket);
  console.log("user 접속");

  socket.on("joinRoom", (room, name) => {
    // 방 개념으로 접속시켜주는 함수 join(방 이름)
    socket.join(room);
    // to(room) 현재 그 방에 있는 클라이언트에게 요청
    io.to(room).emit("joinRoom", room, name);
  });
  socket.on("leaveRoom", (room, name) => {
    // 방 개념으로 떠나게 해주는 함수 leave(방 이름)
    socket.leave(room);
    // to(room) 현재 그 방에 있는 클라이언트에게 요청
    io.to(room).emit("leaveRoom", room, name);
  });
  socket.on("chat", (room, name, msg) => {
    // to(room) 현재 그 방에 있는 클라이언트에게 요청
    io.to(room).emit("chat", name, msg);
  });
  socket.on("secret", (room, name, msg) => {
    // to(room) 현재 그 방에 있는 클라이언트에게 요청
    io.to(room).emit("secret", name, msg);
  });
});

// 접속된 모든 클라이언트엑 메세지를 전송
// io.emit('이벤트명',보낼 데이터)

// 메세지를 전송한 클라이언트에게만 메세지를 전송
// socket.emit('이벤트명',보낼 데이터)

// 메세지를 전송하는데 자기 제외 발송
// socket.broadcast.emit('이벤트명',보낼 데이터)

// 특정 클라이언트에게만 귓속말
// io.to(아이디).emit('이벤트명', 보낼 데이터)

// 클라이언트 접속과 종료 들어왔을때 나갔을때
// io.on("connection"(접속했을때) / "disconnection"(나갔을때) , (socket)=>{})
