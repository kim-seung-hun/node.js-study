const express = require("express");
const fs = require("fs");
// path는 기본 경로를 다룰수 있게 도와주는 모듈
const path = require("path");
const ejs = require("ejs");
const { sequelize } = require("./model");

const app = express();

// path.join 함수는 매개변수로 받은 문자열들을 주소처럼 합쳐줌
// path.join('a','b') >> a/b 주소처러 만들어줌
// app2.js가 있는 위치 __dirname
// views 폴더까지의 경로가 기본값 렌더링 할 파일을 모둔 폴더
// app.set express에 값을 저장가능  밑에 구문은 views 키에 주소값 넣은 부분
app.set("views", path.join(__dirname, "view"));

// 렌더링하는 기본 엔진을 ejs처럼 사용한다고 알려주는것
// engine('파일의 타입' , ejs 그릴때 방식을)  뷰 엔진이 그릴때
// html의 뷰 엔진을 ejs 렌더링 방식으로 바꾼다.
app.engine("html", ejs.renderFile);

// 뷰 엔진 설정을 html을 렌더링할때 사용한다.
// app.set은 express에 값을 저장할때 사용
app.set("view engine", "html");

app.use(express.urlencoded({ extended: false }));

// sequelize 구성해보자 연결 및 테이블 생성 >> 여기가 처음 매핑
sequelize
  // sync : 데이터베이스 동기화하는 함수 (객체모델과 매핑)
  // 실행될때 필요한 테이블을 생성
  // 필요한 테이블 다 생성되고 매핑 >> 처음부터 생성과 동시에 매핑을 하기 때문에 테이블의 내용이 달라도 어긋나지 않는다.
  // 여기서 create table 문이 여기서 실행

  // force : 테이블 내용을 강제 초기화 시킬것인지 여부
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log(3000, "server running");
});
