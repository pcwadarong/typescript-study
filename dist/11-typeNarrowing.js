// 타입 좁히기
// 조건문 등으로 넓은 타입 => 좁은 타입으로 상황에 따라 좁히기
function func(value) {
    //value.toFixed(); // 오류 : 확실히 number가 아님
    //value.toUpperCase(); // 오류 : 확실히 string이 아님
    // 따라서 타입을 확실하게 보장해줘야 함
    if (typeof value === "number") {
        console.log(value.toFixed()); // value의 타입이 number 타입이 됨 => 타입 좁히기
    }
    else if (typeof value === "string") {
        console.log(value.toUpperCase());
    } // 타입 가드 : 조건문과 함께 사용해 타입을 좁히는 표현
}
function func1(value) {
    if (value instanceof Date) {
        // 좌측 항이 오른쪽에 오는 class의 instance인지 확인함
        console.log(value.getTime());
    }
    else if (value && "age" in value) {
        // value instanceof Person은 오류가 발생함: 타입이 와선 안됨
        // "age" in value를 사용함: age는 Date도 null도 아닌 Person에만 존재함
        // in 뒤에는 null이나 undefined가 올 수 없기에 value가 true임을 명시
        console.log(`${value.name}은 ${value.age}살 입니다`);
    }
}
export {};
