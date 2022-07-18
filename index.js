// 대망의 node.js

// node.js는 무엇인가?
// 자바스크립트를 데이터베이스에 연결해 서버로 요청을 보내는 기능을 구현할 수 있다.
// node.js는 크롬 vs 자바스크립트 엔진으로 빌드된 자바스크립트 런타임이다.
// node.js는 웹서버 자체로 생각하는건 잘못된 것 아파치 같은 웹서버 중 하나가 아니다.
// 자바스크립트와 같은 브라우저가 아니라 서버에서 자바스립트가 동작하도록 도와주는 런타임 플랫폼

// 2009년에 라이언 달이라는 개발자가 node.js를 처음으로 만들었고 지금까지도 업데이트가 잘되고 있다.
// node.js를 설치해서 실행한다고 웹서버가 실행되는게 아니고 node.js에 있는 라이브러리를
// npm(node pakage manager)을 이용해서 설치하여 사용 가능

// node.js의 특징 3가지
// 1. 자바스크립트로 백엔드 서버 로직을 개발할 수 있다.
// 2. 구글에서 개발한 js엔진을 쓰기 때문에 속도가 빠르다.(인터프리터 방식)
// 3. 논 브로킹 방식 node.js의 모든 API는 비동기적으로 작동하며 호출 후 API를 바로 불러올수 있다.
//    한번 불러왔던 API를 요청하면 이벤트 루프가 확인해서 동작

// node.js가 왜 생겼는가?
// 방대한 오픈소스 생태계를 구축하기 위해
// npm(node pakage manager)를 사용해서 pakage를 다운받을 수 있고,
// react express core 등 익숙한 것들의 pakage들은 다 npm에 등록되어 있다.
// 특수한걸 만드는 사람이 아닌이상 거의 모든 기능이 나와 있다.
// 잘쓰면 빠르고 좋을 효과를 볼 수 있다.

// module(pakage의 모임)
// pakage는 클래스의 묶음
// 기능들의 모임 , 파일의 모임

// require 많이 사용
// node.js의 repuire 무엇인가?

// node.js에서 모듈을 가져오는 방법 require함수를 사용해서 가져온다.
// require(경로나 이름)
const http = require("http");

// http객체 안의 createServer함수를 사용해서 서버를 만듬
// http.createServer를 변수에 담으면 서버가 되는 부분을 반환 받을 수 있다.
const server = http.createServer((req, res) => {
  // req 요청값
  // 404 500 이런 오류들을 보여줌
  // http에서 ok를 나타내는 번호가 200번이라서
  req.statusCode = 200;
  //http 상태코드
  //100번대 : 정보응답
  //200번대 : 성공응답
  //300번대 : 리다이렉션 메세지, 요청한 url이 변경되었을 때
  //400번대 : 클라이언트상의 오류
  //500번대 : 서버 오류 응답, 서버에 오류가 있을 때

  //write 문자를 써서 보내주는 함수
  res.write("123");
  //end함수 끝맺음 매개변수 문자를 보내주면서 끝
  res.end("456");
});

const PORT = 3000;
//서버가 되는 server에 함수를 사용한다. 서버를 열어줌
//listen함수로 서버를 열어줌
server.listen(PORT, () => {
  console.log("port : ", PORT);
});
//server 객체의 준비가 되면 listen함수로 해당 포트에 서버를 대기시킨다.
//서버를 대기시키는 이유는 클라이언트에서 요청이 오면 서버가 받아서 처리할수 있다.
//여기 들어가는 매개변수는 (포트번호 , 호스트의 이름 , 백로그 , 콜백함수) 이렇게 있다.

//node.js 실행하는 법 (cmd open 후 [node -v]로 버전 확인)
//node 자바스크립트 파일의 경로
//localhost:3000

//node.js 코딩을 해볼수 있는곳 테스트 코드들
// 코드샌드박스 , glitch 등등
// 노드 서버를 바로 볼수 있고 코딩도 바로바로 테스트 해볼수 있다.
// 어느 머신의 서버에 접속되어 있음

// glitch 장점
// https 검증도 되어있는 웹서버를 테스트로 사용해볼수 있다.
// node 프로젝트 생성버튼을 누르고
// server.js에 서버 로직을 작성한 후 바로
// preview 버튼을 눌러서 위에 버튼을 바로 그 창에서 화면으로 볼 수 있고
// 테스트용 링크가 필요하면 preview 버튼을 눌렀을때 preview in anew window 버튼을 누르면
// 클라이언트 요청을 보내볼 웹서버 주소로 접속이 된다.
// 그래서 테스트에 용이하게 사용할수 있다.

// node.js 버전관리 방법
// 서버노드는 최신 / 로컬노드 구버전
// 최신버전은 기능이 있는데 구버전에 없을 경우에 기능이 실행되지 않음
// 이런 버전 문제가 생겼을 경우 해결해주는 아이, 물론 우리가 조작을 해줘야한다.
// 삭제했다 깔았다하면 쉬운데 귀찮으니까
// nvm(Node Version Manager)
// 맥 >> tj/n(Node Version Manager)

// https://github.com/coreybutler/nvm-windows/releases
// 윈도우 nvm-setup.zip 설치

// 이전버전 보려면
// https://nodejs.org/ko/download/releases/

// cmd창에 입력
// nvm -v : 설치되어있는 버전확인
// nvm ls : nvm에 설치되어있는 버전 확인 명령어
// nvm install v(버전) : nvm 변경할 node 버전 설치 명령어

// node 설치된 버전을 적용하는 명령어 버전 바꿔주는 명령어
// nvm use (바꿀 버전)

//state오류가 발생하면 cmd를 관리자 권한으로 실행해야한다.
