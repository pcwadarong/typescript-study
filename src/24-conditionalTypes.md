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

- 조건부 타입을 `union`과 함께 사용할 때 조건부 타입이 분산적으로 동작할 수 있도록 업그레이드되는 분법

```ts
// number ↔ string
type StringNumberSwitch<T> = T extends number ? string : number;

let varA: StringNumberSwitch<number | string>;
//string | number
```

- 위와 같은 경우 `number | string`은 `number`의 서브타입이 아니므로 조건식이 거짓이 되어 변수 A의 타입이 `number`가 될거라고 예상할 수 있다.
- 하지만 분산적인 조건부 타입으로 업그레이드 되기 때문에 생각대로 동작하지 않는다.
- `union` 타입으로 전달되는 순간, 두 타입이 한 번에 대입되는 것이 아닌 `StringNumberSwitch<number>`과 `StringNumberSwitch<string>`으로 따로따로 분산되게 된다.
- 그후, 각 타입의 결과를 모아 다시 `union` 타입으로 묶기 때문에 위와 같은 결과가 나오는 것이다.

---

만약 분산적인 조건부 타입으로 만들고 싶지 않다면 `extends`의 양옆에 대괄호를 붙여주면 된다.

```ts
type StringNumberSwitch<T> = [T] extends [number] ? string : number;

let varA: StringNumberSwitch<number | string>;
// number
```

### Exclude 조건부 타입 구현하기

- Union 타입으로부터 특정 타입만 제거하는 Exclude(제외하다) 타입 구현하기

```ts
type Exclude<T, U> = T extends U ? never : T;
type A = Exclude<number | string | boolean, string>;
```

- 단계별 해석

```ts
// 1 단계
Exclude<number, string>;
Exclude<string, string>;
Exclude<boolean, string>;

// 2 단계
number |
  never |
  boolean |
  // 결과
  number |
  never |
  boolean;

// 최종 결과
type A = number | boolean;
```

- 최종 결과에서 `never`가 사라지는 이유는, `never`은 공집합이기 때문이다. `union`이란 합집합을 의미하는데, `number`와 공집합의 합집합은 결국 `number`가 된다.
- 따라서 타입 `Exclude`는 `string` `U` 타입으로 제시된 타입을 소거하고 나머지 타입만을 분리해 낼 수 있다.

---

- 반대로 해당 타입만 추출하는 `Extract` 타입 또한 만들 수 있다.

```ts
type Extract<T, U> = T extends U ? T : never;
type A = Exclude<number | string | boolean, string>;
```

## infer (inference)
- 조건부 타입 내에서 특정 타입을 추론하는 문법
- 특정 함수 타입에서 반환값의 타입만 추출하는 특수한 조건부 타입인 `ReturnType`을 만들 때 이용 가능

- 우선 `infer` 없이 만들어본다.
```ts
type FuncA = () => string;
type FuncB = () => number;

type ReturnType<T> = T extends () => string ? string : T;

type A = ReturnType<FuncA>; // string
type A = ReturnType<FuncB>; // () => number
```
- 타입 `A`는 `ReturnType`의 `T`에 `FuncA`, 즉 `() => string`을 넣는다.
- `() => string`와 `() => string`를 비교하고 있으므로 서브 타입 조건이 성립하여 `string`이 도출된다.
- 이와 같이 타입 `B`는 조건이 성립하지 않아 `() => number`가 도출된다.
- 하지만 이 결과는 반환 값이 타입인 `number` 대신 `() => number`을 출력하고 있으므로 원하는 바가 아니다.
- 이때 `infter`을 사용하면 원하는 값을 도출할 수 있다.

```ts
type ReturnType<T> = T extends () => infer R ? R : never;

type FuncA = () => string;
type FuncB = () => number;

type A = ReturnType<FuncA>; // string
type B = ReturnType<FuncB>; // number
```
- 이렇게 되는 이유는, `extends () => infer R`이란 `extends () => R` 과 같은데, `T extends () => R`가 참일 때 `R`이 되게 만드려면 대입된 `() => string` 가 `() => R`과 같아야 하고, 결국 `string`이 `R`과 같아야 한다는 결과가 도출되기 때문이다.
---
- 그런데 `type B = ReturnType<number>`라고 입력할 시 `never`가 나오게 된다.
- 그 이유는 `T`인 `number`가 `() => R` 의 서브타입이 될 수 없기 때문이다.

> #### 궁금증 : 아래의 코드와 뭐가 다른 거죠?
> ```ts
>type FuncA = string;
>type FuncB = number;
>
>type ReturnType<T> = T extends () => string ? string : T;
>
>type A = ReturnType<FuncA>; //string
>type B = ReturnType<FuncB>; // number
>```
>`infer` 타입은 함수의 반환 타입을 추론하는 것이나, 위의 코드는 특정 타입에 대한 반환 타입을 명시적으로 정의하는 것이다. 코드의 결과 값은 같지만 의도가 다르다.
---
- 조금 더 쉬운 예제
```ts
type PromiseUnpack<T> = T extends Promise<infer R> ? R : never;
// 1. T는 프로미스 타입이어야 한다.
// 2. 프로미스 타입의 결과값 타입을 반환해야 한다.

type PromiseA = PromiseUnpack<Promise<number>>;
// number

type PromiseB = PromiseUnpack<Promise<string>>;
// string
```
