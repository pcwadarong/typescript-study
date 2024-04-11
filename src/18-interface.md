# 인터페이스

- 타입 별칭과 동일하게 타입에 이름을 지어주는 또 다른 문법
- 상호간의 약속된 규칙
- 객체의 구조를 정의하는데 특화된 문법으로, 상속, 합침 등의 특수한 기능을 제공함

```ts
interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: "이정환",
  age: 27,
};
```

## 선택적 프로퍼티

```ts
interface Person {
  name: string;
  age?: number;
}

const person: Person = {
  name: "이정환",
  // age: 27,
};
```

## 읽기 전용 프로퍼티

```ts
interface Person {
  readonly name: string;
  age?: number;
}

const person: Person = {
  name: "이정환",
  // age: 27,
};

person.name = "홍길동"; // ❌
```

## 메서드 타입 정의하기

```ts
interface Person {
  readonly name: string;
  age?: number;
  sayHi: () => void;;
}

//혹은 호출 시그니쳐를 통해 정의
interface Person {
  readonly name: string;
  age?: number;
  sayHi(): void;
}
```

## 메서드 오버로딩

함수 타입으로는 불가능, 호출 시그니처로만 가능

```ts
interface Person {
  readonly name: string;
  age?: number;
  sayHi(): void;
  sayHi(a: number): void;
  sayHi(a: number, b: number): void;
}
```

## 불가능한 부분

- 아래와 같이 union(합집합)이나 intersection(교집합)을 인터페이스 안에서 직접 정의하는 것이 불가능함
- 타입 별칭(type alias)이나 주석에 대신 활용
- 주석의 경우 타입 체크를 우회하는 것이므로 권장 x, 타입 별칭 추천

```ts
interface Person {
  readonly name: string;
} & number;  // ❌

type Type1 = number | string;
type Type2 = number & string;

// @ts-ignore
const person: Person | number = {
  name: "이정환",
};
```
