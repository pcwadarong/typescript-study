// 타입 단언 (Type Assersion)
// 조심해서 필요할 때만 사용하는 것을 추천
// https://ts.winterlood.com/71f4a577-4340-4994-956d-a7aa47176ffa
let person = {};
person.name = "이정환";
person.age = 27;
let dog = {
    name: "돌돌이",
    color: "brown",
    breed: "진도",
};
// breed 라는 초과 프로퍼티가 존재하지만 단언을 사용하여 초과 프로퍼티 검사를 피했음.
// type 단언의 조건: A가 B의 슈퍼타입이거나, B가 A의 슈퍼타입이어야 함
let num1 = 10; // ✅
let num2 = 10; // ✅
//let num3 = 10 as string;  // ❌
// 다중 단언 : 위의 오류 해결 가능!
let num3 = 10;
// 하지만 눈속임에 불과하기 때문에 사용 지양함
// ---------------------------------
// const 단언
let num4 = 10; // 10 Number Literal 타입으로 단언
// const로 선언한 것과 동일한 효과
let cat = {
    name: "야옹이",
    color: "yellow",
};
let post = {
    title: "게시글1",
};
// author의 닉네임 길이를 추론하는 기능 구현
// 옵셔널 체이닝: null이나 undefined의 경우 점 표기법 접근이 불가능하기 때문에 ?을 붙여서 post.author?.length 자체를 undefined로 만들어주는 기능
// 그런데, undefined는 number에 할당할 수 없으므로 아래는 오류가 남
//const len: number = post.author?.length;
// 따라서 post.author가 undefined나 null이 아니라고 믿게 만들어주는 기능(눈속임)인 non null을 활용함
// 물음표 대신 느낌표를 붙임
const len = post.author.length;
export {};
