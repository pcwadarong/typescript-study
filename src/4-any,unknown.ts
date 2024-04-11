// any
// 특정 변수의 타입을 정확히 모를 때: 모든 타입을 넣을 수 있다.
let anyVar: any = 10;
anyVar = "hello"; // 가능
anyVar.toUpperCase(); // 가능

let num: number = 10;
num = anyVar; // 재할당도 가능

// 치트키 같은 타입이지만, 런타임 에러가 발생함
// 최대한 사용지양

// ---------------------------------
// unknown
// 비슷하지만 약간의 제약이 있음
let unknownVar: unknown;
unknownVar = 10;
unknownVar = "hello";

//num = unknownVar; //불가능 : type 'unknown' is not assignable to type 'number'
//unknownVar.toUpperCase(); //불가능 : 'unknownVar' is of type 'unknown'
