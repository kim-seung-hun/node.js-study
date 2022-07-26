// module로 내보내기
module.exports = {
  extends: ["airbnb-base", "plugin:node/recommended", "prettier"],
};

// 설정 해보자
// 미리 좋은 setting들이 있기 때문에 유명한 airbnb 규칙을 가져와 사용해본다.

// airbnb 패키지 설치 명령어
//----------------------------------------------------
// npm install --save-dev eslint-config-airbnb-base
// npm install --save-dev eslint-plugin-import
//----------------------------------------------------

// npm 패키지 두개를 동시에 다운받아야 하면
//-----------------------------------------------------------------------
// npm install --save-dev eslint-config-airbnb-base eslint-plugin-import
//-----------------------------------------------------------------------
// --save-dev는 개발환경
// --save-dev로 받은건 devDependencies에 작성된다.
// 개발에만 필요하고 실제 구동은 필요없는 것들

// eslint prettier package 다운명령어
//-------------------------------------------------------
// npm install --save-dev eslint-config-prettier
//-------------------------------------------------------

// prettier와 충돌이 나기 떄문에 빨간게 많이 뜨는데
// extends: ["airbnb-base", "prettier"] prettier 규칙도 같이 적용해 주면 된다.
// ESLint 사용할줄 알고 에어비앤비 규칙을 다룰줄 안다.
// 이게 지금까지 우리가 작업거와 다르게 많이 깐깐하다

// node에 대한 설정 node 전용 플러그인
// node 전용 플러그인 설치 명령어
//------------------------------------------------------
// npm install --save-dev eslint-plugin-node
//------------------------------------------------------
