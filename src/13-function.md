# 함수 타입 정의

## 타입 스크립트에서 함수를 설명하는 가장 좋은 방법
어떤 [타입]의 매개변수를 받고, 어떤 [타입]의 결과값을 반환하는지 설명
```ts
const add = (a: number, b: number) => a + b;
```

## 매개변수 기본값 설정하기
함수의 매개변수에 기본값이 설정되어있으면 타입이 자동으로 추론
```ts
function introduce(name = "이정환") {
  console.log(`name : ${name}`);
}
```
- 이때 기본값과 다른 타입으로 매개변수의 타입을 정의할 경우 오류 발생
```ts
function introduce(name: number = "이정환") {
  console.log(`name : ${name}`);
}
```

기본값과 다른 타입의 값을 인수로 전달할 경우도 오류 발생
```ts
introduce(1);
```

## 선택적 매개변수 설정
```ts
function introduce(name = "이정환", tall?: number) {
  console.log(`name : ${name}`);
  console.log(`tall : ${tall}`);
}

introduce("이정환");
```

그런데 `tall` 뒤에 물음표가 붙은 이상 해당 값이 `undefined`나 `null` 값일 수도 있으므로 아래의 계산식은 불가능해짐
```ts
function introduce(name = "이정환", tall?: number) {
  console.log(`name : ${name}`);
  if (typeof tall === "number") {
    console.log(`tall : ${tall + 10}`);
  }
}
```

이럴 땐 타입 가드를 통해 좁혀주면 가능함 <br>
> 선택적 매개변수는 반드시 필수 매개변수 뒤에 배치해야 함.
```ts
function introduce(name = "이정환", tall?: number, age: number) {
  console.log(`name : ${name}`);
  if (typeof tall === "number") {
    console.log(`tall : ${tall + 10}`);
  }
}
```

## 나머지 매개변수 (rest 파라미터)
- 인수 값이 모두 숫자이므로 `number` 전달 후 배열로 받음
```ts
function getSum(...rest: number[]) {
  let sum = 0;
  rest.forEach((it) => (sum += it));
  return sum;
};

getSum(1, 2, 3);
getSum(1, 2, 3, 4);
```