- node.js 프로젝트를 배포하기 위한 온라인 레퍼지토리다.
- 패키지를 설치하고, 버전과 의존성을 관리하기 위한 cli 툴이다.
- npm 자체로는 어떤 패키지도 실행할 수 없다. 만약 특정 패키지를 사용하고 싶다면, 반드시 package.json 파일에 명시해야 한다.
- 실행파일을 설치하고 나면 Npm은 그것들에 대한 링크를 연결한다.
  - local : ./node_modules/.bin/ 저장소에 링크가 연결된다.
  - global : 전역 bin/ 파일에 연결된다.

### 패키지 실행 :

만약 패키지를 실행하고 싶다면, local path도 입력해야 한다.

```
$ ./node_modules/.bin/your-package
```

아니면 package.json script 섹션에 넣음으로써 실행할 수 있다.

```
{
  "name": "your-application",
  "version": "1.0.0",
  "scripts": {
    "your-package": "your-package"
  }
}
```

여기에 넣고나서, npm run을 실행하면 된다.

```
npm run your-package

```
