// 경매소 만들기
// 이후에 로그인 회원가입 분여서 구현해볼것 (쿠키 세션 JWT)

// 사용할 모듈
// express, ejs, socketio, fs, nomdemon

// 1. packjson 설치하고
// 2. express 서버 세팅
// 3. 페이지 라우터 분리해서 보여주기
// 4. nodemon 개발 버전으로 설치

// "/" 루트경로 페이지 하나
// /shop 페이지 하나

const express = require("express");
const socketio = require("socket.io");
const fs = require("fs");
const ejs = require("ejs");

const app = express();

const PORT = 3000;

// use 함수 사용해서 설정 추가
// 이름도 사용하겠다는 뜻
// express 안에 static 함수 사용
// console.log(express.static(__dirname + "/img"));
// 절대경로 설정
// console.log(__dirname + "/img");

//함수를 전달했고 server의 설정에 (__dirname + "/img") 파일의 경로를 설정해준다.
// __dirname + "/img"
// __dirname 현재의 프로젝트 경로
// app.use(express.static(__dirname + "/img"));
// "/src" 이 부분은 자신이 설정한 경로의 이름을 정의해줄수 있다.
// __dirname + "/img" ===== "/src" 같다
app.use("/src", express.static(__dirname + "/img"));
app.use("/src", express.static(__dirname + "/img2"));

// 상품의 번호를 정해줄 변수
let counter = 0;

// 생성자 함수 (객체 만들기 위해 함수 만듬)
function Products(name, image, price, count) {
  // 상품 추가할때마다 번호 증가할수 있도록 증강 연산자 사용 count++
  this.index = counter++;
  this.name = name;
  this.image = image;
  this.price = price;
  this.count = count;
}

// 동적 할당을 new를 붙여서 생성자 함수 사용
// 객체를 하나 만듬
// console.log(new Products("사과", "/", 2000, 20));

// 상품을 전부 가지고 있을 배열
const products = [
  new Products("사과", "/", 2000, 20),
  new Products("수박", "/", 3000, 20),
  new Products("초코", "/", 200, 20),
  new Products("비타민", "/", 5000, 20),
  new Products("커피", "/", 2000, 20),
];

// console.log(products);

const server = app.listen(PORT, () => {
  console.log(PORT, "server running");
});

const io = socketio(server);

app.get("/", (req, res) => {
  fs.readFile("page.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.get("/shop", (req, res) => {
  // 파일 읽어온것
  // 이렇게 쓰고 반환값을 받으면 html 파일을 읽어서 utf-8 인코딩하고 반환해준다
  const page = fs.readFileSync("shop.html", "utf-8");
  res.send(
    ejs.render(page, {
      products: products,
    })
  );
});

let cart = [];

// 소켓 이벤트 연결
io.on("connection", (socket) => {
  // 상품 구매 취소 했을때 돌리는 함수
  function onReturn(index) {
    // 물건에 갯수를 다시 돌린다. 더해준다
    products[index].count++;
    // 물건을 제거
    // 배열 안의 값 제거 delete 배열[인덱스]
    delete cart[index];
    let count = products[index].count;
    io.emit("count", {
      index,
      count,
    });
  }

  // 이벤트 연결 웹소켓이 가지고 있는 이벤트
  socket.on("cart", (index) => {
    // 물건의 갯수를 감소
    products[index].count--;

    // 빈 객체를 하나 만들어서 해당 배열의 인덱스 자리에 넣고
    cart[index] = {};
    // 해당 배열의 인덱스 자리에 있는 객체에 index 키를 추가하고 밸유를 넣어준다/
    cart[index].index = index;
    let count = products[index].count;
    io.emit("count", {
      index,
      count,
    });
    //   {
    //       index: 1,
    //           count : 2,
    //   }
    // 이렇게 보임 짧은 문법
  });

  // 구매 했을때 이벤트 연결
  socket.on("buy", (index) => {
    // cart의 해당 삼품 index 제거
    delete cart[index];
    let count = products.count;
    io.emit("count", {
      index,
      count,
    });
  });
  // 상품 구매를 취소했을때
  socket.on("return", (index) => {
    onReturn(index);
  });
});
