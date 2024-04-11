// unknown: 슈퍼타입, 전체 집합: 다른 타입에서 업캐스팅 모두 가능
function unknown() {
    let a = 1; // number -> unknown
    let b = "hello"; // string -> unknown
    let c = true; // boolean -> unknown
    let d = null; // null -> unknown
    let e = undefined; // undefined -> unknown
    let f = []; // Array -> unknown
    let g = {}; // Object -> unknown
    let h = () => { }; // Function -> unknown
}
// never: 공집합, 다른 모든 타입으로 업캐스팅 가능
function never() {
    function neverFuc() {
        while (true) { }
    }
    let a = neverFuc(); // never -> number
    let b = neverFuc(); // never -> string
    let c = neverFuc(); // never -> boolean
    let d = neverFuc(); // never -> null
    let e = neverFuc(); // never -> undefined
    let f = neverFuc(); // never -> Array
    let g = neverFuc(); // never -> Object
}
//void: 중간 타입이자, undefined의 슈퍼타입
function voidExam() {
    function voidFunc() {
        console.log("hi");
        return undefined; // undefined 반환 가능
    }
}
//any 타입: 슈퍼타입으로도, 공집합으로도 존재 가능. 타입 계층도 무시. never 제외!
function anyExam() {
    let unknown;
    let anyVar;
    let undefinedVar;
    let neverVar;
    undefinedVar = anyVar; //any -> undefined:다운캐스팅 가능
    anyVar = unknown; // unknown -> any:다운캐스팅 가능
    //neverVar = anyVar; // 유일하게 불가능한 타입
}
export {};
