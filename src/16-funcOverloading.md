# 함수 오버로딩

동일한 하나의 함수를 매개변수의 개수나 타입에 따라 다르게 동작하도록 만드는 문법

- c 언어 예시

```c
// 매개변수 없음
void func() {
    printf("매개변수 없음");
}

// 매개변수 1개
void func(int a) {
    printf(a + 20);
}

// 매개변수 2개
void func(int a, int b) {
    printf(i + j);
}
```

- 자바스크립트에서는 불가능, 타입스크립트에서만 가능

## 오버로드 시그니쳐, 구현 시그니쳐

- 오버로드 시그니쳐: 구현부 없이 선언부만 만들어둔 함수로, 함수 오버로딩을 구현하려면 구현하기 전 먼저 생성해야 함
- 아래의 코드에서는 2개의 오버로드 시그니쳐를 생성했으며 각각 함수의 버전을 의미함

```ts
function func(a: number): void; //Ver. 1
function func(a: number, b: number, c: number): void; //Ver. 3
```

- 구현 시그니쳐: 실제로 함수가 어떻게 실행될 것인지를 정의하는 부분

```ts
// 버전들 -> 오버로드 시그니쳐
function func(a: number): void;
function func(a: number, b: number, c: number): void;

// 실제 구현부 -> 구현 시그니쳐
function func(a: number, b?: number, c?: number) {
  if (typeof b === "number" && typeof c === "number") {
    console.log(a + b + c);
  } else {
    console.log(a * 20);
  }
}

func(1); // ✅ 버전 1 - 오버로드 시그니쳐
func(1, 2); // ❌
func(1, 2, 3); // ✅ 버전 3 - 오버로드 시그니쳐
```

- 구현 시그니쳐의 매개변수 타입은 모든 오버로드 시그니쳐와 호환되도록 만들어야 하기 때문에 매개변수 b와 c를 선택적 매개변수로 만들어야 함.
