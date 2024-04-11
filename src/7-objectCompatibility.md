## 객체 타입의 호환성
프로퍼티 수가 적은 타입이 슈퍼 타입이다

```ts
type Animal = {
  name: string;
  color: string;
};

type Dog = {
  name: string;
  color: string;
  breed: string;
};

let animal: Animal = {
  name: "기린",
  color: "yellow",
};

let dog: Dog = {
  name: "돌돌이",
  color: "brown",
  breed: "진도",
};

animal = dog; // ✅ OK : 업캐스팅
dog = animal; // ❌ NO : 다운캐스팅
```

- 그런데 언뜻보면 업캐스팅 같지만 `breed`에서 오류가 발생
- 이는 <b>초과 프로퍼티 검사</b> :변수를 객체 리터럴로 초기화 할 때 발동하는 타입스크립트의 특수한 기능
- 타입에 정의된 프로퍼티 외의 다른 초과된 프로퍼티를 갖는 객체를 변수에 할당할 수 없음

```ts
let dog2: Animal = {
  name: "돌돌이",
  color: "brown",
  breed: "진도", // ❌
};
```