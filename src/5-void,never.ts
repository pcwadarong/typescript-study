// void -> 아무것도 없음
// 리턴문을 사용하고 싶지 않은 함수에서 사용

function fun1(): string {
  return "hello";
}

function func2(): void {
  console.log("hello");
}

let a: void;
//a = 1; // 불가능 : Type 'number' is not assignable to type 'void'
//a = "hello"; // 불가능
a = undefined;

// 그렇다면 undefined나 null 대신 왜 사용할까?

//undefined:
function func3(): undefined {
  console.log("hello");
  return undefined;
  return; // return undefined나 return; 을 써줘야만 함
}

// null:
function func4(): null {
  console.log("hello");
  return null; // return null만을 꼭 다시 써줘야만 함
}

// 따라서 아무것도 반환하고 싶지 않을 때는 void를 사용함

// ---------------------------------
//never : 불가능한 타입
function fun5(): never {
  while (true) {} //무한 반복 : 정상적으로 종료될 수 없음
}

function fun6(): never {
  throw new Error(); //실행되자마자 에러를 반환하여 정상 작동 x
}

//let a: never 후 재할당은 어떤 값도 절대. 불가능함
