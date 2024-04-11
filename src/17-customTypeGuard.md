# 사용자 정의 타입 가드
- 참 또는 거짓을 반환하는 함수를 이용해 사용자 의도대로 타입 가드를 만들 수 있도록 도와주는 타입스크립트의 문법
- 라이브러리 등 type의 형식이 이미 정해져 있어서 서로소 유니온 타입을 쓰지 못할 때 등에 사용
```ts
type Dog = {
  name: string;
  isBark: boolean;
};

type Cat = {
  name: string;
  isScratch: boolean;
};

type Animal = Dog | Cat;

function warning(animal: Animal) {
  if ("isBark" in animal) {
    console.log(animal.isBark ? "짖습니다" : "안짖어요");
  } else if ("isScratch" in animal) {
    console.log(animal.isScratch ? "할큅니다" : "안할퀴어요");
  }
}
```
- 그런데 이렇게 `in` 연산자를 이용해 타입을 좁히는 방식은 좋지 않다
- 만약 프로퍼티의 이름이 수정되거나 추가, 삭제될 경우에는 제대로 동작 x
- 따라서 해당 타입의 존재 여부를 확인하는 함수를 따로 만듦.

```ts
// Dog 타입인지 확인하는 타입 가드
function isDog(animal: Animal): animal is Dog {
  return animal.isBark !== undefined;
  // 'Animal' 형식에 'isBark'가 없습니다.
}
```
- 그런데 `animal` 타입이 제대로 좁혀지지 않아 오류가 남.
- 따라서 `animal`을 함수 내부에서 단언하도록 코드 작성
```ts
function isDog(animal: Animal): (animal as Dog) is Dog {
  return animal.isBark !== undefined;
}

function warning(animal: Animal) {
  if (isDog(animal)) { }
}
```
- 그런데 또, 타입스크립트는 직접 만든 함수의 반환값으로는 잘 좁혀주지 못함
- 따라서 함수 자체를 타입 가드 역할을 할 수 있도록 함
```ts
// Dog 타입인지 확인하는 타입 가드
function isDog(animal: Animal): animal is Dog {
  return (animal as Dog).isBark !== undefined;
}

// Cat 타입인지 확인하는 타입가드
function isCat(animal: Animal): animal is Cat {
  return (animal as Cat).isScratch !== undefined;
}

function warning(animal: Animal) {
  if (isDog(animal)) {
    console.log(animal.isBark ? "짖습니다" : "안짖어요");
  } else {
    console.log(animal.isScratch ? "할큅니다" : "안할퀴어요");
  }
}
```
- 반환값의 타입으로 `animal is Dog`를 정의하면 이 함수가 `true`를 반환하면 조건문 내부에서는 이 값이 `Dog` 임을 보장한다는 의미
