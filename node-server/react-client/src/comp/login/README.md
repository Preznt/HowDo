## connect-session-sequelize 설치

`npm install connect-session-sequelize`

## 회원가입 수정할 부분

- 값이 없는 상태에서 가입하기 누르면 오류 알려주고, 값이 입력되면 오류 메시지 사라지게 하기
- 다 입력이 된 후에 가입하기 누르면 메인 페이지로 이동하기

### 2/13 오류

- 닉네임 부분 값을 입력안하고 다른 거 입력했을 경우 오류 메시지 그대로 남아있다
- 회원가입 중간에 다른 창 갔다오면 오류 메시지 그대로 남아있다

## 로그인 수정할 부분

- 유효성 검사 추가해주기
- 로그인 버튼 입력하면 메인 페이지로 이동
- 비밀번호 찾기는 시간남으면 추가해주기

### 2/13 오류

- 오류 메시지가 다른 곳에 갔다오면 그대로 남아있다

## 개선하고 싶은 부분

- 세션 만료가 되면 alert 창 뜨게 하기 (어디에서든)
