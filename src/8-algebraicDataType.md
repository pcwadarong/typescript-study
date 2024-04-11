## 대수타입

여러 개의 타입을 합성해서 만드는 타입

## 합집합 타입 - Union 타입

- 갯수 제한이 없음

```ts
let a: string | number | boolean;

a = 1;
a = "hello";
a = true;
```

- 배열 가능

```ts
let arr: (number | string | boolean)[] = [1, "hello", true];
```

- 객체

```ts
type Dog = {
  name: string;
  color: string;
};

type Person = {
  name: string;
  language: string;
};

// 합집합은 아래의 세 가지를 모두 충족함
type Union1 = Dog | Person;

let union1: Union1 = {
  // ✅
  name: "",
  color: "",
};

let union2: Union1 = {
  // ✅
  name: "",
  language: "",
};

let union3: Union1 = {
  // ✅
  name: "",
  color: "",
  language: "",
};
```

- 불가능 : 여집합도, 교집합도 아닌 그 밖의 요소이기 때문이다.

```ts
let union4: Union1 = {
  // ❌
  name: "",
};
```

# 교집합

```ts
let variable: number & string; // never 타입
```

- `Dog`의 요소도 `Person`의 요소도 모두 포함하고 있어야 하기 때문에 한 특성이라도 빠지면 안됨

```ts
type Intersection = Dog & Person;

let intersection1: Intersection = {
  // ✅
  name: "",
  color: "",
  language: "",
};

let intersection1: Intersection = {
  // ❌
  name: "",
  color: "",
};
```
