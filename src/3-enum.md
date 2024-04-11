## Enum
- 열거형 타입
- 여러가지 값들에 각각 이름을 부여해 열거해두고 사용하는 타입

```ts
enum Role {
  ADMIN = 0, //혹은 숫자를 할당하지 않아도 알아서 0부터 할당함
  USER = 10,
  GUEST = 2,
}

enum Language {
  korean = "ko",
  english = "en",
}

const user1 = {
  name: "이정환",
  role: Role.ADMIN, //관리자
  language: Language.korean,
};

const user2 = {
  name: "홍길동",
  role: Role.USER, // 회원
};

const user3 = {
  name: "아무개",
  role: Role.GUEST, // 게스트
};

console.log(user1, user2, user3);
//{ name: '이정환', role: 0, language: 'ko' } { name: '홍길동', role: 10 } { name: '아무개', role: 2 }
```
CSS 변수처럼, 어떤 내용을 할당할 때 헷갈리지 않고 동일하게 할당하는 것을 도와준다.

---

객체처럼 적용되어 컴파일해도 사라지지 않는다!
```js
// js 컴파일 결과
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["USER"] = 10] = "USER";
    Role[Role["GUEST"] = 2] = "GUEST";
})(Role || (Role = {}));
var Language;
(function (Language) {
    Language["korean"] = "ko";
    Language["english"] = "en";
})(Language || (Language = {}));
```