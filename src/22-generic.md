# 제네릭 함수

- 함수나 인터페이스, 타입 별칭, 클래스 등을 다양한 타입과 함께 동작하도록 만들어 주는 타입스크립트의 놀라운 기능

- 만약 하나의 func으로 다양한 타입을 받고 싶다고 할 때, 매개변수로 `any` 타입을 할당할 경우 오류가 나지 않지만 좋지 않고, `unknown`타입을 할당할 경우 오류를 걸러주지만 메서드를 오류로 판단하게 되어 `if` 등의 조건문으로 타입 좁히기를 이용해야 한다.

```ts
function func(value: any) {
  return value;
}
let num = func(10); //any
let str = func("string"); //any
num.toUpperCase(); // ✅ 하지만 타입 검사 제대로 안됨.

//----------------
function func(value: unknown) {
  return value;
}
let num = func(10); // unknown
let str = func("string"); // unknown

if (typeof num === "number") {
  num.toFixed();
} //타입 좁히기 사용 필요
```

- 따라서 아래처럼 받는 매개변수의 타입에 따라 함수가 호출될 때 즉각적으로 타입을 결정하는 제네릭 함수를 사용하면 편리하다.
- Generic이란, 일반적인, 포괄적인이라는 뜻을 가지고 있고, General과 유의어이다.
- 모든 것을 두루두루 다루는 범용적인 함수라는 뜻으로 해석이 된다.

```ts
function func<T>(value: T): T {
  return value;
}

// number 타입
let num = func(10);
num.toFixed();

// string 타입
let str = func("string");
str.toUppercase();
```

- 그 방법으로는, 함수 이름 뒤에 꺽쇠(<>)를 열고 타임을 담는 변수인 타입 변수 `T`를 선언하는 것이다. 그 후 매개변수와 반환값의 타입을 또한 `T`로 설정한다.

```ts
function func<T>(value: T): T {
  return value;
}

let arr = func([1, 2, 3] as [number, number, number]); //기존의 tuple 타입
let arr = func<[number, number, number]>([1, 2, 3]);
// 제네릭 타입
```

- 추가적으로, 제네릭 함수를 호출할 때 타입 변수에 할당할 타입을 직접 명시하는 것도 가능하다.

## 타입 변수 응용하기

- 2개 이상의 변수가 필요한 상황에서 T, U처럼 2개의 타입 변수를 사용할 수 있음

```ts
function swap<T, U>(a: T, b: U) {
  return [b, a];
}

const [a, b] = swap("1", 2);
```

- 단순히 `data:T`로 정의하게 되면 `unknown`의 배열을 `return`하지 못하는 오류가 발생하므로, `T[]`로 배열도 받을 수 있도록 한다.

```ts
function returnFirstValue<T>(data: T[]) {
  return data[0];
}

let num = returnFirstValue([0, 1, 2]);
// number

let str = returnFirstValue([1, "hello", "mynameis"]);
// number | string
```

- 그런데 현재 매개변수로 `number`와 `string`타입을 전달하기 때문에 타입 스크립트는 0번째로 어떤 타입이 들어올지 알수 없어 `T`는 `String | Number`의 유니온 타입이 된다.

- 그런데 여기서 반환값의 타입을 배열의 첫 번째 요소의 타입으로 확정짓고 싶다면 `tuple`과 나머지 파라미터를 활용한다.

```ts
function returnFirstValue<T>(data: [T, ...unknown[]]) {
  return data[0];
}

let str = returnFirstValue([1, "hello", "mynameis"]);
// number
```

- 이 경우 첫 번재 요소의 타입을 수집하고, 나머지는 알지 않아도 되는 값으로 취급하기 때문에 `number` 타입으로 추론이 가능하다.

## 타입 변수 제한하기

- 타입 변수를 적어도 `length` 프로퍼티를 갖는 객체 타입으로 제한하는 방법이다.
- 이전처럼 `<T>(data: T[])` 로 작성할 경우 `string` 타입이나 `{ length: 1 }`는 포함되지 않아 오류가 발생한다.
- 이 경우 확장(extend)를 이용하면 된다.

```ts
interface InterfaceA {
  length: number;
}

interface InterfaceB extends InterfaceA {}
```

- InterfaceB는 type이 `number`인 `length`라는 프로퍼티를 무조건 가지고 있다.
- 이처럼 `T extends { length : number }` 라고 정의하면 T는 이제 `{ length : number }` 객체 타입의 서브 타입이 된다.
- 즉, `T`는 무조건 `Number` 타입의 프로퍼티 `length` 를 가지고 있는 타입이 되어야 한다는 것이다.

```ts
function getLength<T extends { length: number }>(data: T) {
  return data.length;
}

getLength("123"); // ✅
getLength([1, 2, 3]); // ✅
getLength({ length: 1 }); // ✅
getLength(undefined); // ❌
getLength(null); // ❌
```

- 따라서 1번 호출은 인수로 `length` 프로퍼티가 존재하는 `String` 타입의 값을 전달 / 2번 호출은 인수로 `length` 프로퍼티가 존재하는 `Number[]` 타입의 값을 전달 / 3번 호출은 인수로 `length` 프로퍼티가 존재하는 객체 타입의 값을 전달 했으므로 허용된다.

## map, forEach

### Map 메서드 타입 정의하기

- 우선 일반 함수로 `map` 메서드를 직접 만들고 타입을 정의한다.

```ts
function map(arr: unknown[], callback: (item: unknown) => unknown) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i]));
  }
  return result;
}
```

- 모든 `unknown` 타입을 타입 변수 T로 대체하여 제네릭 함수로 만든다.

```ts
function map<T>(arr: T[], callback: (item: T) => T) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i]));
  }
  return result;
}
```

- 그런데 이때, `map([1, 2, 3], (it) => it.toString());` 이런 식으로 전달하는 매개변수의 타입은 `number`, 하지만 `callback` 함수의 반환값 타입은 `string`이 되는 등 두 타입의 불일치가 일어나면 오류가 발생한다.
- 하지만 `map` 메서드는 이렇게 원본 배열 타입과 다른 타입의 배열로도 변환할 수 있어야 하기 때문에 타입 변수를 하나 더 추가해야 한다.

```ts
const arr = [1, 2, 3];

function map<T, U>(arr: T[], callback: (item: T) => U): U[] {
  (...)
}
//T는 string, U는 number

map(arr, (it) => it.toString());
// string[] 타입의 배열을 반환
// 결과 : ["1", "2", "3"]
```

### forEach 메서드 타입 정의하기

- 전처럼 먼저 일반 함수로 작성합니다. 이때 `callback`함수는 특정한 코드를 반환하지 않으므로 `void`로 정의합니다.

```ts
function forEach(arr: unknown[], callback: (item: unknown) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}
forEach([1, 2, 3], (it) => {
  console.log(it.toFixed());
});
```

- 그런데 이렇게 되면 `unknown`타입을 `toFixed`할 수 없기 때문에 오류가 발생함.
- 따라서 `T`를 사용해서 제레릭 타입으로 바꿔준다.

```ts
function forEach<T>(arr: T[], callback: (item: T) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}
forEach([1, 2, 3], (it) => {
  console.log(it.toFixed());
}); //number
```

## 제네릭 인터페이스

- 제네릭은 인터페이스에도 적용할 수 있다.

```ts
interface KeyPair<K, V> {
  key: K;
  value: V;
}

let keyPair: KeyPair = {
  // ❌
  key: "key",
  value: 0,
};

let keyPair: KeyPair<string, number> = {
  key: "key",
  value: 0,
};

let keyPair2: KeyPair<boolean, string[]> = {
  key: true,
  value: ["1"],
};
```

- 제네릭 인터페이스는 제네릭 함수와는 다르게 변수의 타입으로 정의할 때 반드시 꺽쇠와 함께 타입 변수(혹은 제네릭 타입 변수, 제네릭 타입 파라미터)에 할당할 타입을 명시해주어야 한다.

### 인덱스 시그니쳐와 함께 사용하기

- 인덱스 시그니쳐와 함께 사용하면 훨씬 더 유연한 객체 타입을 정의할 수 있다.

```ts
interface Map<V> {
  [key: string]: V;
}

let stringMap: Map<string> = {
  key: "value",
};

let booleanMap: Map<boolean> = {
  key: true,
};
```

- 이 경우 key는 `string`인 반면 `value`는 꺽쇄 안의 타입과 부합하는 아무 값이나 할당할 수 있기 때문에 훨씬 다양한 값을 넣을 수 있다.

### 제네릭 인터페이스 활용 예시

```ts
interface Student {
  type: "student";
  school: string;
}

interface Developer {
  type: "developer";
  skill: string;
}

interface User {
  name: string;
  profile: Student | Developer;
}

function goToSchool(user: User) {
  if (user.profile.type !== "student") {
    console.log("잘 못 오셨습니다");
    return;
  }

  const school = user.profile.school;
  console.log(`${school}로 등교 완료`);
}

const developerUser: User = {
  name: "이정환",
  profile: {
    type: "developer",
    skill: "typescript",
  },
};

const studentUser: User = {
  name: "홍길동",
  profile: {
    type: "student",
    school: "가톨릭대학교",
  },
};
```

- 위처럼 개발자 유저와 학생 유저를 구분하고, 학생 유저일때만 콘솔에 출력하게 하는 프로그램이 있다고 할 때, 매번 User들 중에 if문으로 타입을 좁혀서 한 가지만 골라낸다면 코드가 복잡해질 것이다.
- 따라서 `User`옆에 꺽쇄를 붙여 제네릭 타입으로 만들어준다면 쉽게 사용할 수 있다.

```ts
(...)
interface User<T> {
  name: string;
  profile: T;
}

function goToSchool(user: User<Student>) {
  const school = user.profile.school;
  console.log(`${school}로 등교 완료`);
}

const developerUser: User<Developer> = {(...)};

const studentUser: User<Student> = {(...)};
```

## 제네릭 타입 별칭

- 제네릭 타입 별칭을 사용할 때에도 제네릭 인터페이스와 마찬가지로 타입으로 정의될 때 반드시 타입 변수에 설정할 타입을 명시해 주어야 한다.
- 제네릭 인터페이스와 거의 유사하다.

```ts
type Map<V> = {
  [key: string]: V;
};

let stringMap: Map<string> = {
  key: "string",
};
```

## 제네릭 클래스

- 먼저 제네릭이 아닌 간단한 `Number `타입의 리스트를 생성하는 클래스를 만든다.

```ts
class NumberList {
  constructor(private list: number[]) {}
  // 호출할 때 초기값을 주어 필드와 this 생략
  push(data: number) {
    this.list.push(data);
  }

  pop() {
    return this.list.pop();
  }

  print() {
    console.log(this.list);
  }
}

const numberList = new NumberList([1, 2, 3]);
```

- 그런데 이 경우 stringList를 만들면 거의 중복된 코드를 다시 작성해야 한다.
- 이럴 때 제네릭 클래스를 만들면 쉽게 해결할 수 있다.

```ts
class List<T> {
  constructor(private list: T[]) {}

  push(data: T) {
    this.list.push(data);
  }

  pop() {
    return this.list.pop();
  }

  print() {
    console.log(this.list);
  }
}

const numberList = new List([1, 2, 3]);
const stringList = new List(["1", "2"]);
```

- 제네릭 인터페이스나 타입 변칭과는 다르게 초기값으로 전달하는 값의 타입을 추론할 수 있기 때문에 꺽쇄를 달지 않아도 된다.

## 프로미스와 제네릭
- 프로미스는 `resolve`나 `reject`의 결과값의 타입을 기본적으로 `unknown` 으로 추론한다.
```ts
const promise = new Promise((resolve, reject) => {
  seTimeout(() => {
    resolve(20);
  }, 3000);
});

//response는 unknown 타입
promise.then((response) => {
  console.log(response * 10);
  // ❌ : unknown 타입은 곱셈 불가능
})
```
- 따라서 `resolve`의 경우, Promise뒤에 비동기 함수의 결과값을 따로 선언해주면 동작할 수 있다.
```ts
const promise = new Promise<number>((resolve, reject) => {
  seTimeout(() => {
    resolve(20);
    // resolve("20"); ❌ number만 가능
  }, 3000);
});

promise.then((response) => {
  console.log(response * 10); // ✅
})
```
- 그런데 `reject`의 경우 언제나 `any`타입으로 결과값 타입을 정의할 수 없기 때문에 조건문을 통한 타입 좁히기로 안전하게 사용하는 것을 권장한다.
```ts
const promise = new Promise<number>((resolve, reject) => {
  seTimeout(() => {
    reject("실패"); //혹은 빈칸, 아무 타입 가능
  }, 3000);
});

promise.catch((err) => {
  if (typeof err = "string"){
    console.log(err);
  }
})
```

### 프로미스를 반환하는 함수의 타입을 정의
- 인터넷에서 어떤 글을 불러오는 비동기 함수를 작성한다고 가정함.
```ts
interface Post {
  id: number;
  title: string;
  content: string;
}

function fetchPost() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        title: "게시글 제목",
        content: "게시글 본문",
      });
    }, 3000);
  });
} 

const postRequest = fetchPost();

postRequest.then((post)=> {
  post.id; // ❌
})
```
- 현재는 Promise의 결과값의 타입을 지정해주지 않았기 때문에 `unknown`으로 추론되어 `post.id` 라는 코드를 실행할 수 없음.
- 이 경우 아래의 두 가지 방법으로 해결 가능함.
```ts
// 1 :타입 변수 선언
function fetchPost() {
  return new Promise<Post>((resolve, reject) => {
    setTimeout(() => { (..) });
} 

// 2 : 반환값 타입 명시 <- 추천! ✨
function fetchPost() : Promise<Post>{
  return new Promise((resolve, reject) => {
    setTimeout(() => { (..) });
} 
```