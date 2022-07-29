// 사용할 모듈
// socketio, express, fs

// 영화관 좌석 예약 만들기

const express = require("express");
const socketio = require("socket.io");
const fs = require("fs");

// 0 : 계단
// 1 : 빈 좌석
// 2 : 예약된 좌석
let seats = [];

let temp = [
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
];

let temp1 = [
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
];

let temp2 = [
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
];

let seatsArr = [temp, temp1, temp2];
let index = 0;

// 웹서버 생성
const app = express();
const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(PORT, "server open");
});

// socket.io 생성 및 실행
const io = socketio(server);

// html 파일 불러오기
app.get("/", (req, res) => {
  fs.readFile("page.html", (err, data) => {
    // data를 문자열로 바꿔서 보내기
    res.send(data.toString());
  });
});

app.get("/seats/:id", (req, res) => {
  index = req.params.id;
  seats = seatsArr[index];
  res.send(seats);
});

// app.get("/seats", (req, res) => {
//   res.send(seats);
// });

// socket event 생성
io.sockets.on("connection", (socket) => {
  // socket event 이름 reserve 설정
  socket.on("reserve", (data) => {
    let seatsTemp = seatsArr[data.selectCount];
    seatsTemp[data.y][data.x] = 2;
    io.sockets.emit("reserve", data);
  });
});
