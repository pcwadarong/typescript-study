# 조건부 타입

- `extends`과 삼항 연산자를 이용해 조건에 따라 각각 다른 타입을 정의하도록 돕는 문법

```ts
type A = number extends string ? number : string; // 확장 x false -> string
```

```ts
type ObjA = {
  a: number;
};

type ObjB = {
  a: number;
  b: number;
};

type B = ObjB extends ObjA ? number : string; // 확장하기 때문에 true : number
```

## 제네릭 조건부 타입

- 제네릭과 함께 활용할 때 가장 유용하다.

```ts
// number ↔ string
type StringNumberSwitch<T> = T extends number ? string : number;

let varA: StringNumberSwitch<number>; //string
let varA: StringNumberSwitch<string>; //number
```

- 실용적인 예시
- 문자열의 공백을 제거하는 함수를 작성한다.

```ts
function removeSpaces(text: string) {
  return text.replaceAll(" ", "");
}

let result = removeSpace("hi I am from Korea");
```

- 그런데 매개변수로 `undefined`나 `null` 타입의 값이 제공될 수 있다고 가정하자.
- 이 경우 text의 타입으로 `string | undefined | null` 을 제공해야 하는데, 이렇게 되면 함수 내부에서 오류가 나기 때문에 `if`문으로 타입 좁히기를 해줘야 한다.

```ts
function removeSpaces(text: string | undefined | null) {
  if (typeof text === "string") {
    return text.replaceAll(" ", "");
  } else {
    return undefined;
  }
}

let result = removeSpaces("hi im winterlood");
result.toUpperCase(); // ❌
```

- 그런데 타입 좁히기를 하면 `undefined`를 반환할 가능성에 의해 반대로 `toUpperCase()`가 동작하지 않는다. 이 경우 옵셔널 체이닝 `?`이나 타입 단언`as string`으로 해결 가능하다.

```ts
let result = removeSpaces("hi im winterlood") as string; // 혹은
result?.toUpperCase();
```

- 그런데 이 문제를 아래와 같이 조건문 타입과 제네릭으로도 해결이 가능하다.

```ts
function removeSpaces<T>(text: T): T extends string ? string : undefined {
  if (typeof text === "string") {
    return text.replaceAll(" ", "");
  } else {
    return undefined;
  }
}

let result = removeSpaces("hi im winterlood");
result.toUpperCase();
```

- 이렇게 되면 전달하는 타입을 가지고 반환값을 추론할 수 있게 되어 함수 외부에 오류가 사라진다.
- 하지만 타입스크립트에서 제네릭 타입 변수인 `T`는 기본적으로 함수 내에서 `unknown`으로 취급되기에 삼항 연산자의 결과도 알 수 없고 함수 내부에서 어떤 연산도 수행할 수가 없다.
- 따라서 해당 타입을 모든 타입을 포함하는 `any` 로 타입 단언 해줘야 한다.

```ts
if (typeof text === "string") {
  return text.replaceAll(" ", "") as any;
} else {
  return undefined as any;
}
```

- 하지만 `any`를 반환하는 것은 `return 0 as any;`로 적어도 동작하는 등 검사 부분에서 아쉬운 일이기에, 함수 오버로딩을 사용하여 해결한다.

```ts
function removeSpaces<T>(text: T): T extends string ? string : undefined;
// 오버로딩 시그니처

function removeSpaces<T>(text: any) {
  if (typeof text === "string") {
    return text.replaceAll(" ", "");
  } else {
    return undefined;
  }
}
```

- 이렇게 되면 반환되는 타입이 `string`이나 `undefined`가 아니라면 오버로딩에서 오류를 감지할 수 있다.

---

#### 추가공부

- `T`를 `any`로 단언하고 함수 오버로딩 없이 조건부로 해결하는 방법

```ts
function removeSpaces<T extends string | undefined | null>(
  text: T
): T extends string ? string : undefined {
  if (typeof text === "string") {
    return text.replaceAll(" ", "") as string;
  } else {
    return undefined;
  }
}
```

- `any`를 사용한 것보다 타입 안정성이 높고, 조건부 타입을 사용했으며, 코드 관리를 어렵게 만들 수 있는 함수 오버로딩 없이 해결하여 더 좋은 코드이다.

## 분산적인 조건부 타입
