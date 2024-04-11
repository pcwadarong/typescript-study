## 타입 좁히기

조건문 등으로 넓은 타입 => 좁은 타입으로 상황에 따라 좁히기

```ts
function func(value: number | string | Date) {
  value.toFixed(); // ❌ 확실히 number가 아님
  value.toUpperCase(); // ❌ 확실히 string이 아님
}
```

- 따라서 타입을 확실하게 보장해줘야 한다
- 타입 좁히기: `value`의 타입이 세 가지 중 `number` 타입이 됨
- 타입 가드: 조건문과 함께 사용해 타입을 좁히는 표현

```ts
function func(value: number | string | Date) {
  if (typeof value === "number") {
    console.log(value.toFixed());
  } else if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
```

- 그런데 위의 조건문에 `Date` 객체와 `getTime` 메서드를 활용할 경우, `null`값을 추가했을 때 `null` 값 또한 `object`가 반환되기에 오류 발생 가능성이 있음
- 따라서 `instanceof` 타입 가드를 사용함
- `A instanceof B`: 좌측 항이 오른쪽에 오는 class의 instance인지 확인함

```ts
function func(value: number | string | Date) {
  if (typeof value === "number") {
    console.log(value.toFixed());
  } else if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if (value instanceof Date) {
    console.log(value.getTime());
};
```

### 새로운 예시

- `value instanceof Person`은 오류가 발생함: 타입이 와선 안되기 때문이다.
- 따라서 대신 `"age" in value`를 사용함: `age`는 `Date`도 `null`도 아닌 `Person`에만 존재함
- `in` 뒤에는 `null`이나 `undefined`가 올 수 없기에 `value`가 `true`임을 명시해야 함

```ts
type Person = {
  name: string;
  age: number;
};

function func1(value: Date | null | Person) {
  if (value instanceof Date) {
    console.log(value.getTime());
  } else if (value && "age" in value) {
    console.log(`${value.name}은 ${value.age}살 입니다`);
  }
}
```
