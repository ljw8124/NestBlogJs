# NestJS 연습

현재 MongoDB Docker 에 들어있음
```shell
# MongoDB 도커에 설치
docker pull mongo # 따로 버전 안쓰면 latest

 # 컨테이너 실행
 docker start [Container명]
 
 # 몽고디비 실행 명령어
 docker run --name '사용할 이름' -v ~/data:/data/db -d -p '포트번호':'포트번호' mongo
 
 # 실행 확인
 docker ps
 
 # 커맨드라인으로 controller, service 만들기
 # --no-spec 은 *.controller.spec.ts 파일 생성 안하는 방법
 nest g controller user --no-spec
 nest g service user --no-spec 
```

API 서버 형식으로 구성했기 때문에 화면에서 호출시 아래과 같은 형식으로 request 보내야함
```js
  let url = 'url address';
  
  $.ajax({
    url: url,
    type: 'GET/POST/UPDATE/DELETE',
    data: data,
    success: function(result) {
      // 후처리
      callback(result);
    },
    error: function(error) {
      // 후처리
      callback(error);
    }
  });
  
```

