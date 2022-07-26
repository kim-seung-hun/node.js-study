// express 모듈 사용
const express = require("express");
// fs 모듈 사용
const fs = require("fs");
// socket.io 모듈 사용
const socketio = require("socket.io");

// express로 서버 몸체 만들기
const app = express();

// 사용할 PORT 변수에 할당
const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(PORT, "잘 열렸어요");
});

// socketio 생성 및 실행
const io = socketio(server);

app.get("/", (req, res) => {
  fs.readFile("page2.html", (err, data) => {
    res.end(data);
  });
});

// io.sockets.on('connection') client가 접속 했을때
// io.sockets.on('disconnection') client가 접속을 끊었을때

io.sockets.on("connection", (socket) => {
  // 클라이언트에서 page2.html의 socket.emit("message",data);
  // 웹소켓에 연결되어있는 message 이벤트를 실행시켜준다.
  // 밑에 코드
  socket.on("message", (data) => {
    // 요기
    io.sockets.emit("message", data);
  });
});
