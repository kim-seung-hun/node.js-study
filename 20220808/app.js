// 쿠키 & 세션

// 쿠키와 세션을 쓰는 이유?
// 데이터나 인증(권한)을 유지하기 위해

// "쿠키"는 pc에 남아있고 "세션"은 웹을 끄면 종료됨

// 쿠키
// 웹 사이트를 방문할때 사용자의 컴퓨터에 기록할 데이터
// 클라이언트 상태 정보를 저장했다가 재사용 할 수 있다.
// ex) <팝엄 오늘은 보지 않기> 체크박스 , 몇일정도 쿠키를 저장할지 , 자동 로그인

// 쿠키의 특징
// 이름, 값, 유효기간, 경로 정보로 구성되어 있다.
// 클라이언트에 총 300개 까지 쿠키를 저장할 수 있다.
// 하나의 도메인 당 20개의 쿠키를 가질 수 있다.
// 쿠키 한개 당 4KB까지 저장 가능

// url / 루트 이 경로에서 쓰는 쿠키들도 따로 관리
// url / user 이 경로에서 사용할 쿠키도 따로 관리할 수 있다.

// 키값과 밸유가 있고 유효기간은 date 객체로 언제까지 유지할지 설정

// 쿠키 생성 함수 매개변수는 (이름, 키값, 유효기간)
let createCookie = function (name, value, time) {
  // date 객체를 생성해서 변수에 담고
  let date = new Date();
  // date 객체의 시간을 설정하는데 setTime
  // ex) time의 값이 1이면 1일 하루
  // date.getTime() 현재 시간에 time을 더하면 생성한 시간부터 1일이 지난 시간
  date.setTime(date.getTime() + time * 24 * 60 * 60 * 1000);

  // 쿠키의 구조
  // 키 = 값 문자열로 저장
  // 객체 사용하는 것처럼 키로 접근해서 쿠키의 값을 가져온다

  // 쿠키의 경로(path)
  // 도메인 하위로 하위 쿠키 경로를 지정 할 수 있다.
  // 쿠키 개수가 적으면 거의 루트만 사용

  // 만료일(expires)
  // 만료일은 GMT 시각 문자열 , 쿠키는 삭제하는 기능이 없다
  // 이전 만료일을 지정해주면 만료되어 삭제된다. 아예 무척 과거 시간을 지정해서 삭제
  // 보안 문제나 개인정보 노출이 이슈이니, 시간은 웬만하면 짧게 (1개월 ~ 3개월) 정도 추천

  // 쿠키이름 쿠키값; expries = set,02 oct 2021 15:50:50 GMT
  // toUTCString() 함수를 사용해서 set,02 oct 2021 15:50:50 GMT; path=/
  document.cookie =
    name + "=" + value + ";expires" + date.toUTCString() + ";path=/";
};

// 쿠키값을 가져오는 함수
let getCookie = function (name) {
  // 현재 저장된 쿠키 중 name에 맞는 쿠키가 저장되어 있으면
  // 값을 내보낸다.
  let value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  // 쿠키의 값이 있는 인덱스가 2번이라서 2번 인덱스 값을 가져온다
  return value ? value[2] : null;
};

// 쿠키 유무 확인 함수
let isActiveCookie = function (key) {
  // 값이 있는지 없는지 빈 문자열이 아니면 값이 있는 것.
  return getCookie(key) != null ? true : false;
};

// 쿠키 제거 함수
let isDeleteCookie = function (key) {
  // 쿠키 제거 기능은 없기에 제일 예전 날짜를 넣어줘서 자동으로 삭제되게 만든다.
  document.cookie = key + "=; expires = Thu, 01 Jan 1999 00:00:10 GMT";
};
