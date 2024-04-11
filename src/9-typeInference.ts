// 타입 추론

// 명시하지 않아도 가능한 상황들
let a = 10; // number
let b = "hello"; // string

let c = {
  id: 1,
  name: "이정환",
  profile: {
    nickname: "winterlood",
  },
  urls: ["https://winterlood.com"],
}; // id, name, profile, urls 프로퍼티가 있는 객체 타입

function func1() {
  return "hello";
} // return하는 값을 기준으로 추론 (string)

function func2(message = 1) {
  return "hello";
} // 매개변수의 기본값이 설정되어 있을 경우 해당 값으로 추론
// function func2(message?: number): string

// ---------------------------------
// 주의해야 할 상황들

let d; // 1. 초기값 생략 let 선언: 암시적으로 any 타입으로 추론 (범용적인 사용을 위해 타입 넓히기)

const num = 10; // 2. const 선언: num 리터널 타입으로 추론
const str = "hello"; // string 리터럴 타입으로 추론

let arr = [1, "string"]; // 3. 최적 공통 타입: (string | number)[] 타입으로 추론
