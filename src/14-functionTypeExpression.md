## 함수 타입 표현식 (Function Type Expression)
- 함수 타입을 타입 별칭과 함께 별도로 정의
- 비슷한 타입 정의를 할 때 요긴하게 사용함

```ts
type Operation = (a: number, b: number) => number;
const add: Operation = (a, b) => a + b;
const sub: Operation = (a, b) => a - b;
const multiply: Operation = (a, b) => a * b;
const divide: Operation = (a, b) => a / b;
```

## 호출 시그니쳐(Call Signature)
- 같은 기능을 함
- 함수도 객체이기 때문에 객체를 정의하듯 함수의 타입을 별도로 정의
```ts
type Operation2 = {
    (a: number, b: number): number;
  };
  
  const add2: Operation2 = (a, b) => a + b;
  const sub2: Operation2 = (a, b) => a - b;
  const multiply2: Operation2 = (a, b) => a * b;
  const divide2: Operation2 = (a, b) => a / b;
```

- 호출 시그니처를 사용했을 땐 프로퍼티를 추가 정의하는 것도 가능함
- 이 경우 함수이자 일반 객체를 의미하는 타입으로 정의되며 하이브리드 타입이라고 부름
```ts
type Operation2 = {
    (a: number, b: number): number;
    name: string;
  };
  
  const add2: Operation2 = (a, b) => a + b;
  (...)
  
  add2(1, 2);
  add.name;
```