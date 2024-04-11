## 인터페이스 확장
- 하나의 인터페이스를 다른 인터페이스들이 상속받아 중복된 프로퍼티를 정의하지 않도록 도와주는 문법

```ts
interface Animal {
  name: string;
  color: string;
}

interface Dog extends Animal {
  breed: string;
}

interface Cat extends Animal {
  isScratch: boolean;
}

interface Chicken extends Animal {
  isFly: boolean;
}

const dog: Dog = {
  name: "돌돌이",
  color: "brown",
  breed: "진도",
};
```

## 프로퍼티 재정의
- `Dog` 타입은 `Animal` 타입을 확장하며 동시에 `name` 프로퍼티의 타입을 `String` 타입에서 `“doldol” String Literal` 타입으로 재정의함
- 주의할 점: 반드시 원본 타입인 A가 재정의된 타입 B의 슈퍼 타입이 되도록 해야 함.
```ts
interface Animal {
  name: string;
  color: string;
}

interface Dog extends Animal {
  name: "doldol"; // 타입 재 정의
  breed: string;
}

interface Dog extends Animal {
  name: number; // ❌
  breed: string;
}
```

## 타입 별칭 확장
- 인터페이스 뿐만 아니라 타입 별칭으로 정의된 객체도 확장할 수 있다.
```ts
type Animal = {
  name: string;
  color: string;
};

interface Dog extends Animal {
  breed: string;
}
```

## 다중 확장
- 여러개의 인터페이스를 확장하는 것 또한 가능
```ts
interface DogCat extends Dog, Cat {}

const dogCat: DogCat = {
  name: "",
  color: "",
  breed: "",
  isScratch: true,
};
```