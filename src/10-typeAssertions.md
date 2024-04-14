## 타입 단언 (Type Assersion)
조심해서 필요할 때만 사용하는 것을 추천

```ts
type Person = {
  name: string;
  age: number;
};

let person: person = {}; //❌

let person = {};
person.name = "이정환";
person.age = 27; //❌
```
1. `let person: person = {};`의 경우, `type`의 프로퍼티를 하나도 가지고 있지 않으므로 오류 발생
2. `let person = {}; person.age = 27;` 의 경우 이미 `person`을 빈 배열로 설정해 두었기 때문에 새롭게 값을 할당할 수 없는 오류 발생
- 따라서 `value as type`으로 원하는 타입을 단언하여 빈 배열이지만 `Person`으로 취급하게 만듦
```ts
type Person = {
  name: string;
  age: number;
};

let person = {} as Person;
person.name = "이정환";
person.age = 27;
```

`breed` 라는 초과 프로퍼티가 존재하지만 단언을 사용하여 초과 프로퍼티 검사를 피했음.
```ts
type Dog = {
  name: string;
  color: string;
};

let dog: Dog = {
  name: "돌돌이",
  color: "brown",
  breed: "진도",
} as Dog;
```

## type 단언의 조건
A가 B의 슈퍼타입이거나, B가 A의 슈퍼타입이어야 함

```ts
let num1 = 10 as never; // ✅
let num2 = 10 as unknown; // ✅
let num3 = 10 as string;  // ❌
```

## 다중 단언
위의 오류 해결 가능! <br>
하지만 눈속임에 불과하기 때문에 사용 지양함
```ts
let num3 = 10 as unknown as string;
```


## const 단언
const로 선언한 것과 동일한 효과
```ts
let num4 = 10 as const; // 10 Number Literal 타입으로 단언
```

- 모든 프로퍼티가 `readonly`를 갖도록 단언됨
- 따라서 모든 프로퍼티에 `readonly`를 쓰지 않고도 같은 효과를 적용할 수 있음
```ts
let cat = {
  name: "야옹이",
  color: "yellow",
} as const;

```

## Non Null 단언 `!`
author의 닉네임 길이를 추론하는 기능 구현
```ts
type Post = {
  title: string;
  author?: string;
};

let post: Post = {
  title: "게시글1",
};

const len: number = post.author?.length; // ❌
const len: number = post.author!.length; // ✅
```

> 옵셔널 체이닝 `?` <br>
null이나 undefined의 경우 점 표기법 접근이 불가능하기 때문에 ?을 붙여서 `post.author?.length` 자체를 `undefined`로 만들어주는 기능

- 코드를 작성하면 자동으로 ?표가 붙게 되는데, `undefined`는 `number`에 할당할 수 없으므로 오류가 남
- 따라서 `post.author`가 `undefined`나 `null`이 아니라고 믿게 만들어주는 기능(눈속임)인 `non null`을 활용함

