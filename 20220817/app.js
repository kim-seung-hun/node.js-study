// crypto(암호화)

// 단방향 , 양방향 암호가 있다.
// 단방향은 복호화해서 원래의 값을 알수 없고,
// 양방향은 복호화해서 원래의 값을 알수 있다

// 우리가 쓸 방식 >> 단방향 : 복호화해서 원래의 비밀번호를 알수 없게하고, 복호화해서 암호를 해독한다.

// ex) 네이버같은 페이지만 봐도 비밀번호 찾기를 시도할시, 비밀번호를 알려주지 않고 비밀번호 변경을 시켜준다.

// 복호화는 암호문을 편문으로 변환하는 과정
// 부호화(인코딩)된 데이터를 부호화 되기 전 형태로 바꿔서 사람이 읽을 수 있는 형태로 되돌려 놓는것

// 단방향의 비교검증 방법
// 데이터 베이스에 저장된 암호화
// 로그인할때 입력받은 비밀번호를 단방향으로 암호화를 통해 비교를 하면
// 기존의 비밀번호는 저장되지 않고, 암호화된 문자열로만 비교한다.

// 단방향 암호화는 해쉬 알고리즘을 사용해서 문자열을 고정된 길이의 문자열로 암호화 시킨다.

// crypto 모듈 가져오기
const crypto = require("crypto");

const pw = "tmdgns123";

// 단순 해싱으로 비밀번호 해싱
let hashAlgor = crypto.createHash("sha512");
// 사용할 해시 알고리즘은 sha512
// (md5, sha1, sha256, sha512 등)
// sha-512 알고리즘은 국가안보국(NSA)이 설계한 암호 해쉬이다.
// sha512는 512비트(64바이트) 해시 값을 만들어주는데
// 일반적으로 길이가 128자리인 16진수로 렌더링 된다.

// 선택된 알고리즘으로 해싱한다.
let hashing = hashAlgor.update(pw); // 매개변수로 암호화 시킬 문자.

// 인코딩한 알고리즘을 넣어준것이 base64
// digest함수를 사용해서 해싱된 객체를 base64로 문자열로 반황
let hashStr = hashing.digest("base64");

// console.log(hashStr);

// 왜 이렇게 할까?
// 알고리즘으로 암호화해서 해킹하기 힘들게 하려고

// 지금 이렇게만 해쉬알고리즘으로 암호화하면 같은 값이 들어가면
// 암호화된 문자열도 계속 같기 때문에 암호화의 효과가 안좋다.
// 해커를 더 힘들게 하려면
// salt라는 기법을 사용한다. (필수)
// 비밀번호에 추가 문자열을 덧붙여서, 같은 비밀번호라도 암호화 시키면 다른 해쉬값이 출력되게 만든다.

// salt 값은 항상 비밀번호에 매번 추가 시켜서 사용해야 하기 때문에
// salt 값을 잘 숨겨놓자 (ex. env파일)

// 크립토의 랜덤바이트 생성 함수 (32바이트 이상이어야 짐작하지 어렵다)
// 매개변수 인자 (바이트사이즈 , )
// crypto.randomBytes(32, function (err, byte) {
//   // 32바이트의 랜덤한 바이트 생성
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(byte);
//   }
// });

// 크립토의 randombytes 함수로 salt 값을 만들어서
// 데이터 베이스에 저장한 후 모든 패스워드가 고유의 salt 값을 가지고 할수도 있다.

// 키 스트레칭
// salt와 패스워드를 해시함수에 넣는 과정을 반복시켜 해커가 복호화하는 것을 방해한다.
// 계산량을 늘려서 인위적으로 값의 출력을 느리게 하는 방법

// pbkdf , scrypto , bcrypto
// bcrypto를 많이 사용한다.

// pbkdf
// 해시함수 컨테이너 역할을 하고
// 해시함수의 salt를 적용해서 해시함수의 반복횟수를 지정해서 암호화할수 있고
// IOS 표준에 적합하며 NIST에서 승인된 알고리즘이다

// scrypto
// 현재 사용 중인 가장 강력한 알고리즘이긴 하나 메모리와 cpu를 많이 잡아먹어 역효과가 날수있다.
// 오프라인 공격(서버에 요청보내기 등)에 많이 강력하지만 , 자원을 많이 써서 위험하다.
// openSSL 1.1 이상을 제공하는 시스템에서만 사용가능하다.
// 주어진 자원에서 공격자가 사용할 수 있는 병렬처리 양이 한정되어 있다.

// bcrypto
// 보안에 집착하기로 유명한 openBSD에서 사용하고
// NET 및 자바를 포함한 많은 플랫폼 언어에서도 사용할 수 있다.
// 반복횟수를 늘려 연산속도를 늦출수 있기때문에, 연산능력이 증가해도 공격에 대비를 할수 있다.
// 암호화된 string 중에서 일부분을 salt로 쓰고 있어서
// 그 데이터를 얻어온후에 pw와 같이 보내서 비교한다.

// // pbkdf
// crypto.randomBytes(32, function (err, byte) {
//   crypto.pbkdf2(
//     pw, // 해싱하려고 하는 문자열
//     byte.toString("base64"), // 문자열로 변환하려는데 인코딩 방식은 base64
//     1004, // 반복횟수 지정 (반복 횟수가 많아질수록 복호화하기 어려워지고 시간도 많이 걸린다.)
//     64, // 길이 설정
//     "sha512", // 암호화 알고리즘 설정
//     function (err, hashed) {
//       console.log(hashed);
//     }
//   );
// });

// salt 값을 만들어주는 함수
const createSalt = () => {
  // 암호화를 처리하는데 시간이 걸리기 때문에
  // Promise를 사용해서 비동기 처리를 한다.
  return new Promise((resolve, reject) => {
    // 랜덤바이트 생성 >> 길이가 64
    crypto.randomBytes(64, (err, byte) => {
      if (err) {
        // 실패시
        reject(err);
      } else {
        // 성공시
        resolve(byte.toString("base64"));
      }
    });
  });
};

// 비밀번호를 해싱해주는 함수
const pwHashed = (userId, password) => {
  // Promise를 이용해서 비동기처리
  return new Promise((resolve, reject) => {
    // 유저 테이블에서 user_id의 값이 있는지 확인
    const sql = "SELECT * FROM users WHERE user_id=?";
    client.query(sql, [userId], async (err, result) => {
      if (result[0]?.salt) {
        // 결과값이 있으면
        // 여기서 결과값은 해당 유저의 객체고 그 안에 salt 값을 가져온다
        const salt = await result[0].salt;
        // pbkdf2 암호화를 하는데 해싱 알고리즘은 sha512
        // 길이 : 64 , 반복횟수 : 12345
        crypto.pbkdf2(password, salt, 12345, 64, "sha512", (err, key) => {
          resolve(key.toString("base64"));
        });
      } else {
        reject("err");
      }
    });
  });
};

const createPwHashed = (password) => {
  // 비동기처리
  return new Promise(async (resolve, reject) => {
    const salt = await createSalt(); // 여기서 salt 만들고
    // 비밀번호에 문자를 더해서 암호화시키는 기법 salt 사용
    // 여기서 salt는 랜덤값이다. 랜덤바이트 함수로 만들어냄
    crypto.pbkdf2(password, salt, 10000, 64, "sha512", (err, key) => {
      if (err) {
        reject("err");
      } else {
        // 비밀번호마다 고유 salt 값을 가지고 있게 하기 위해서
        // 암호화 비밀번호와 salt 값을 둘다 데이터 베이스에 저장
        resolve({ password: key.toString("base64"), salt });
      }
    });
  });
};

// 간단 암호화된 로그인을 만들어보자
// express , fs , mysql2
const express = require("express");
const fs = require("fs");
const mysql = require("mysql2");

const app = express();

app.use(express.urlencoded({ extended: false }));

const client = mysql.createConnection({
  user: "root",
  password: "1234",
  database: "test8",
  multipleStatements: true,
});

// const sql =
//   "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255), password VARCHAR(255), salt VARCHAR(255))";
// client.query(sql);

app.get("/", (req, res) => {
  fs.readFile("view/join.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.get("/login", (req, res) => {
  fs.readFile("view/login.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.post("/join", async (req, res) => {
  const { password, salt } = await createPwHashed(req.body.user_pw);
  const sql = "INSERT INTO users (user_id,password,salt)VALUE(?,?,?)";
  client.query(sql, [req.body.user_id, password, salt], () => {
    res.redirect("/login");
  });
});

app.listen(3000, () => {
  console.log(3000, "server running");
});
