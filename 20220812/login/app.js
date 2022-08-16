// express, dotenv, fs, jsonwebtoken, express-session, mysql12
// 개발용 nodemon

const express = require("express");
const dot = require("dotenv").config();
const jwt = require("jsonwebtoken");
const session = require("express-session");
const mysql = require('mysql2');
const fs = require("fs");

// mysql 로컬 데이터베이스 연결
// mysql createConnection 함수를 이용해서 연결 및 생성
const client = mysql.createConnection({
    // 데이터 베이스 계정의 이름
    user:'root',
    // root 계정의 비밀번호
    password: "1234",
    // 연결할 데이터 베이스의 이름
    database: "test7",
    // multipleStatements 다중 쿼리문을 사용할 수 있도록 하는 옵션
    multipleStatements: true,
});

const app = express();
// req.body 객체를 사용할거니까
// express 12버전쯤인가 버전업 되면서 express 설정으로 body 객체를 사용하게 설정할수 있다.
app.use(express.urlencoded({extended:false}));

// 세션도 사용할거니까
app.use(session({
    // 세션발급시 사용되는 키
    secret : "my secret",
    // session을 저장하고 불러올때 session을 다시 저장할지 여부
    resave : false,
    // session에 저장할때 초기화 여부 설정
    saveUninitialized : true,
}));

app.get("/",(req,res)=>{
    fs.readFile("view/login.html","utf-8",(err,data)=>{
        res.send(data);
    })
})

app.listen(3000,()=>{
    console.log(3000, "server running")
})