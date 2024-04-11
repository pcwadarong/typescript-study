## 원시타입

- number

```ts
let num1: number = 124;
let num2: number = -123;
let num3: number = NaN;
```

- string

```ts
let str1: string = "hello";
let str4: string = `hello ${num1}`;
```

- boolean

```ts
let boo1: boolean = true;
```

- null, undefined

```ts
let null1: null = null;
let unde1: undefined = undefined;
```

임시로 null을 넣어놓을 때는 tsconfig.json의 compileOptions 중 `"strictNullChecks": false` 을 활성화해줌

```ts
let numA: number = null; //
```

- 리터럴 -> 값

```
let numA: 10 = 10;
numA = 11; // ❌
let strA: "hello" = "hello";
let boolA: true = true;
```

---

- 배열

```ts
let numArr: number[] = [1, 2, 3];
let strArr: string[] = ["hi", "hello"];

let boolArr: Array<boolean> = [true, false]; //제네릭 문법으로도 가능
```

- 배열 내부 요소가 여러 개일 경우

```ts
let multiArr: (string | number | boolean)[] = [1, "hello", true];

//다차원 배열 (2, 3차원)
let doubleArr: (number[] | string[])[] = [
  [1, 2, 3],
  ["hi", "hello"],
];
```

---

- 튜플 : 길이와 타입이 고정된 배열

```ts
let tup1: [number, number] = [1, 2];
let tup2: [string, number] = ["2", 2];

tup1 = [1, 2, 3]; // ❌
tup2 = [2, "2"]; // ❌
```

- 튜플로 설정했어도 추후에 추가하는 경우 (길이 제한 x) 에러 발생 x

```ts
tup1.push(1);
```

---

- 객체

```ts
let user1: object = {
  //객체 타입 -> 접근 시 오류 발생
  id: 1,
  name: "이정환",
};

user1.id; // ❌ 'object' 타입에 'id'가 없습니다.
```

- 따라서 객체 리터럴 타입로 대신 사용함

```ts
let user2: {
  id?: number; // 옵셔널 체이닝
  name: string;
} = {
  id: 1,
  name: "이정환",
};

user2.id;
```

> <B>TS</B>: 먼저 변수를 선언하고 나중에 타입을 선택하는 시스템을 구조적 타입 시스템 (property based type system) <br><B>C언어, 자바 등</B>: 이름 기반으로 타입을 설정하는 시스템은 명목적 타입 시스템

- `id` 뒤에 물음표가 붙었기 때문에 선언하지 않아도 오류 x : 선택적 프로퍼티라고 함

```ts
user2 = {
  name: "홍길동",
};
```

---

- readonly : 수정할 수 없음

```ts
let config: {
  readonly apiKey: string;
} = {
  apiKey: "My Api Key",
};

// ❌ config.apiKey = "hacked";
//읽기 전용이므로 'apiKey'에 할당할 수 없습니다.
```
