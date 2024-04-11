// 대수타입
// 여러 개의 타입을 합성해서 만드는 타입
// 합집합 타입 - Union 타입
let a; // 갯수 제한이 없음
a = 1;
a = "hello";
a = true;
let arr = [1, "hello", true]; //배열 가능
let union1 = {
    // ✅
    name: "",
    color: "",
};
let union2 = {
    // ✅
    name: "",
    language: "",
};
let union3 = {
    // ✅
    name: "",
    color: "",
    language: "",
};
// 불가능 : 여집합도, 교집합도 아닌 그 밖의 요소이기 때문이다.
// let union4: Union1 = { // ❌
//     name: "",
//   };
// ---------------------------------
// 교집합
let variable; // never 타입
let intersection1 = {
    name: "",
    color: "",
    language: "",
};
export {};
// Dog의 요소도 Person의 요소도 모두 포함하고 있어야 하기 때문에 한 특성이라도 빠지면 안됨
