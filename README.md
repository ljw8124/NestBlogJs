# NestJS 연습

현재 MongoDB Docker 에 들어있음
```shell
 # 컨테이너 실행
 docker start [Container명]
 # 실행 확인
 docker ps
 
 # 커맨드라인으로 controller, service 만들기
 # --no-spec 은 *.controller.spec.ts 파일 생성 안하는 방법
 nest g controller user --no-spec
 nest g service user --no-spec 
```

