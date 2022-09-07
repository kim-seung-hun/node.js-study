// AWS EC2 배포하기

// 1. EC2 ubuntu로 인스턴스
// AWS 페이지에 로그인하고 서비스 탭 옆에 EC2 검색
// EC2 클라우드의 가상 서버 click
// 오른쪽 상단 아이디옆에 region은 최대한 가깝게 설정 (한국 or 일본)
// 왼쪽 >> 인스턴스 click해서 인스턴스 창으로 이동
// 인스턴스 시작 버튼 click

// 프리티어 사용가능 여부 확인 (돈 청구 될수 있음)
// 인스턴스 이름 써주고
// 우분투 click
// 키페어 생성해서 잘 보관해야한다 (유출 우려) >> 저장은 USB 등 저장매체에 담아서 옮긴다
// 키페어 생성 후 오늘자 폴더에 옮긴다

// 인스턴스 시작 > 인스턴스 view > 새로고침 > 대기중에서 실행중으로 바뀜

// 1. 연결 > EC2 인스턴스 연결
// 2. 깃bash >> sudo ssh -i "mykey.pem" ubuntu@ec2-3-36-125-222.ap-northeast-2.compute.amazonaws.com
//                   SSH 클라이언트에서 주소 복사 후 붙여넣기 함
//    password : 내 맥북 비밀번호
//    yes

// ubuntu에 mysql 인스턴스 설치하자

// mysql 설치 명령어

// ubuntu 서버를 먼저 업데이트하고 , mysql-server 설치
// sudo apt-get update
// sudo apt-get install mysql-server

// EC2 ubuntu mysql 접속
// sudo mysql -u root -p
// 비밀번호 뜨면 그냥 엔터

// 데이터 베이스 세팅
// 1. 사용할 데이터베이스 하나 만들어주자
// create database 여기에 이름;

// 이 데이터베이스를 사용해야하니까 유저를 만들어서 사용하자
// 접속할때 유저 정보가 있어야 접속이 가능하니까
// 사용할 유저 생성
// create user '유저이름'@'%' indentified by '비밀번호';

// 만든 유저에게 데이터 베이스 권한을 주자
// grant all on 데이터베이스이름.(이름뒤에 . 붙이기) * to '유저이름'@'%';

// 권한이 주어졌는지 확인
// show grants for '여기에 유저이름';

// 외부에서 접속해보자
// 인스턴스 페이지로 돌아와서
// 하단에 보안 탭을 클릭하고
// 보안그룹 클릭

// 트래픽에 네트워크간에 이동 방향을 말하는 것
// 인바운드 규칙 : 네트워크에 들어오는 정보 , 클라이언트에서 서버로 향하는것
// 아웃바운드 규칙 : 네트워크에서 나가는 정보 , 클라이언트에서 요청하고 서버에서 클라이언트에 보내주는것

// 인바운드&아웃바운드 보안 규칙 추가
// HTTP , HTTPS , MYSQL 모두 추가해준다.

// 보안그룹 규칙설정을 끝냈으면 우리가 EC2에 설치한 MYSQL 접속 허용 설정을 해주자

// sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf;
// 수정모드는 i를 눌러서 들어갈수 있다. (esc 눌러서 나온다)
// :wq! >> 저장 후 종료
// :q! >> 종료
// :w! >> 강제 저장

// 이 파일에서 수정할 부분은 bind-address의 127.0.0.1 이 부분을 0.0.0.0 이렇게 설정해주면 된다.

// mysql 서버 재실행
// sudo service mysql restart

// 외부접속 끝......

// 로컬 워크벤치 켜고

// connection을 추가하는데
// connection 옵션은 hostname에 인스턴스 퍼블릭 IPv4 DNS 주소를 입력

// port는 3306번을 적는다.
// username은 접속할 유저이름 우리가 권한 줬던애
// password는 store in valut 버튼을 눌러서 mysql 비밀번호 입력
// 잘되면 mysql 화면이 보인다. 보이는 화면은 우리가 만든 ec2 우분투에서 설치한 mysql

// 프로젝트 EC2 우분투에 설치하기
// 본인이 올릴 프로젝트를 깃허브에 올리고
// config.js 잘 확인하고 데이터베이스 이름 , 비밀번호 유저이름을 EC2 우분투에 설치한 mysql의 접속 옵션과 동일하게 바꿔준다.
// 인스턴스에 git init 하고
// git remote add origin 깃저장소
// git pull origin main
// 우분투에 내 파일이 올라간다.
