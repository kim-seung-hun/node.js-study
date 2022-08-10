// 팝업창을 띄울 기간을 쿠키에 저장해야함
let createCookie = function (name, value, time) {
  let date = new Date();
  date.setTime(date.getTime() + time * 24 * 60 * 60 * 1000);
  document.cookie =
    name + "=" + value + "; expires" + date.toUTCString() + "; path = /";
};

// 쿠키를 가져와서
let getCookie = function () {
  // 생성해 저장해둔 쿠키와 일치하면
  let value = document.cookie.match("(^|;) ?" + "jinnyCheck" + "=([^;]*)(;|$)");
  // value가 true이면 value[2]
  return value ? value[2] : false;
};

// 체크박스를 체크하지 않으면 쿠키 생성이 되지 않기 때문에 만료일을 옛날로 지정해 삭제해준다.
let isDeleteCookie = function (key) {
  // 만료일 지정
  document.cookie = key + "=; expires = Thu, 01 Jan 1999 00:00:10 GMT; path=/";
};
