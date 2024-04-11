# 함수 타입의 호환성

- 특정 함수 타입을 다른 함수 타입으로 괜찮은지 판단하는 것
- 두 가지 기준이 모두 충족될 때 호환된다고 평가함

## 1. 두 함수의 반환값 타입이 호환되는가?

A 반환값 타입이 B 반환값 타입의 슈퍼타입이라면 두 타입은 호환함

```ts
type A = () => number;
type B = () => 10;

let a: A = () => 10;
let b: B = () => 10;

a = b; // ✅
b = a; // ❌ 다운캐스팅으로 불가능
```

## 2. 두 함수의 매개변수의 타입이 호환되는가?

### 매개변수의 개수가 같을 때

```ts
type C = (value: number) => void;
type D = (value: number) => void;

let c: C = (value) => {};
let d: D = (value) => {};

c = d; // ✅
d = c; // ✅
```

그런데 매개변수의 타입이 다르다면 위와 다르게 업캐스팅이 불가능해짐

```ts
type C = (value: number) => void;
type D = (value: 10) => void;

let c: C = (value) => {};
let d: D = (value) => {};

c = d; // ❌
d = c; // ✅
```

그 이유는 아래의 예시와 함께 설명 가능하다.

```ts
type Animal = {
  name: string;
};

type Dog = {
  name: string;
  color: string;
};

let animalFunc = (animal: Animal) => {
  console.log(animal.name);
};

let dogFunc = (dog: Dog) => {
  console.log(dog.name);
  console.log(dog.color);
};
```

똑같이 이렇게 두 타입이 있고 `Anima`l이 `Dog`의 슈퍼타입일 때, 만약 `animalFunc = dogFunc`로 재할당을 한다면, 타입은 `Animal`을 내용은 `Dog`를 따라가게 되는데 이때 존재하지 않는 프로퍼티에 접근하게 된다.

```ts
let testFuc = (animal: Animal) => {
  console.log(animal.name); // ✅
  console.log(animal.color); // ❌ 존재하지 않는 프로퍼티에 접근함
};
```

반대로 `Dog`에서 `Animal`로 재할당할 때는 가능해진다.

```ts
let dotestFuc = (dog: Dog) => {
  console.log(dog.name);
};
```

따라서 아래와 같은 결과가 나오는 것이다.

```ts
animalFunc = dogFunc; // ❌
dogFunc = animalFunc; // ✅
```

### 매개변수의 개수가 다를 때

할당하려는 쪽의 함수의 매개변수 갯수가 더 적을 때만 가능하다.

```ts
type Func1 = (a: number, b: number) => void;
type Func2 = (a: number) => void;

let func1: Func1 = (a, b) => {};
let func2: Func2 = (a) => {};

func1 = func2; // ✅
func2 = func1; // ❌
```
