// JWT란?
// JSON Web Token의 줄임말
// JSON Web Token은 웹표준으로 두 개체의 JSON 객체를 사용해서 정보를 안정성 있게 전달해준다.

// JWT는 사용할 정보를 자체적으로 가지고 있다.(우리가 필요한 것들)
// JWT로 발급한 토큰은 기본정보 (유저의 정보 프로필)
// 그리고 토큰이 정상인지 검증된 토큰 signature(서명)을 포함하고 있다.

// 웹서버는 http의 헤더에 넣어서 전달 가능
// url params 파라미터로도 전달가능

// 주로 로그인이 정상적인지 회원인증 권한에서 사용

// JWT는 유저가 로그인을 요청 -> 서버는 유저의 정보를 가지고 정상적인 유저면 토큰을 발급해서 전달(입장권)
// 유저가 서버에 요청할 때마다 JWT를 포함해서 전달하면 서버가 클라이언트의 요청을 받을 때마다 해당 토큰이 정상인지 확인 후
// 정상 토큰이면 유저가 요청한 작업을 응답해준다.
// 서버는 유저의 세션을 유지할 필요가 없고 유저가 로그인 되었는지 확인할 필요가 없다.
// 요청했을 때만 토큰을 확인해서 처리하기 때문에 서버 자원을 아낄 수 있다.

// JWT를 쓰는 이유는 장점이 안정성있게 정보를 주고 받을 수 있다.

// JWT를 생성하면 JWT의 라이브러리가 자동으로 인코딩과 해싱(HMAC SHA256 인코딩 및 해싱) 작업을 해준다.
// HMAC : 해싱 기법을 적용해서 메시지의 위변조를 방지하는 기법
// SHA256 : 임의의 길이 메시지를 256비트의 축약된 메시지로 만들어내는 해시 알고리즘

// // JWT 구조
// // 토큰의 정보
// header = {
//     alg : "HS256",
//     type : "JWT"
// }
// payload = {
//     // 토큰의 제목
//     sub : "4151533",
//     // 유저 이름
//     name : "sjsisdfg",
//     // 토큰이 발급된 시간 발급 된지 얼마나 지났는지
//     lat : "1513513513153"
// }
// signature = HMACSHA256(BASE64URL(header) + BASE64URL(payload));

// header : 타입과 알고리즘의 정보를 가지고 있다
// payload : 유저의 정보들과 만료 기간이 포함된 객체를 가지고 있다.
// signature : header, payload를 인코딩하고 합쳐서 비밀키로 해시

// 사용할 모듈
// express, jsonwebtoken, nodemon, fs, body-parser

// const app = require("express")(); 이렇게 써주어도된다.
const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const dot = require("dotenv");

dot.config();

const app = express();

app.post("/login", (req, res) => {
  // 로그인 하면 토큰 발급
  // 토큰을 만들어보자
  // 우리가 지금은 넘길 정보가 없으니까 변수로 만들기
  // .env 파일을 통해 암호화 데이터를 관리하고 유출되는 것을 방지할 수 있다.
  // .env 애플리케이션이 실행될 때 처음부터 특정값을 넘길 변수를 저장해놓는다.
  // env 사용할 때 설치할 모듈
  // ---------------------------------
  // npm i dotenv
  // ---------------------------------
  const name = "jinny";
  const key = process.env.KEY;
  // jwt 토큰 생성하는 함수 (반환 값 있음)
  let token = jwt.sign(
    {
      // 타입 JWT임
      type: "JWT",
      // 유저 이름
      name: name,
    },
    key,
    {
      // 토큰 유효시간 만료될 시간 5분
      expiresIn: "5m",
      // 토큰을 발급한 사람
      issuer: "나",
    }
  );
  let data = {
    msg: "토큰 내용",
    token,
  };
  res.send(JSON.stringify(data));
  // {"msg":"토큰 내용","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwibmFtZSI6Imppbm55IiwiaWF0IjoxNjYwMDE2NjA0LCJleHAiOjE2NjAwMTY5MDQsImlzcyI6IuuCmCJ9.vAJZC2guCQe8fvj6S3OvtQJyWI8hve9Y3GhP8YmI95w"}
  // .으로 구분하는데 맨 앞이 header, 다음이 payload, 마지막이 signature(header랑 payload 합친 해시코드)
});

app.get("/", (req, res) => {
  fs.readFile("index.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.listen(3000, () => {
  console.log("서버열림");
});
