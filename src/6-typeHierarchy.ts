// unknown: 슈퍼타입, 전체 집합: 다른 타입에서 업캐스팅 모두 가능

function unknown(): void {
  let a: unknown = 1; // number -> unknown
  let b: unknown = "hello"; // string -> unknown
  let c: unknown = true; // boolean -> unknown
  let d: unknown = null; // null -> unknown
  let e: unknown = undefined; // undefined -> unknown
  let f: unknown = []; // Array -> unknown
  let g: unknown = {}; // Object -> unknown
  let h: unknown = () => {}; // Function -> unknown
}

// never: 공집합, 다른 모든 타입으로 업캐스팅 가능

function never(): void {
  function neverFuc(): never {
    while (true) {}
  }

  let a: number = neverFuc(); // never -> number
  let b: string = neverFuc(); // never -> string
  let c: boolean = neverFuc(); // never -> boolean
  let d: null = neverFuc(); // never -> null
  let e: undefined = neverFuc(); // never -> undefined
  let f: [] = neverFuc(); // never -> Array
  let g: {} = neverFuc(); // never -> Object
}

//void: 중간 타입이자, undefined의 슈퍼타입

function voidExam() {
  function voidFunc(): void {
    console.log("hi");
    return undefined; // undefined 반환 가능
  }
}

//any 타입: 슈퍼타입으로도, 공집합으로도 존재 가능. 타입 계층도 무시. never 제외!

function anyExam() {
  let unknown: unknown;
  let anyVar: any;
  let undefinedVar: undefined;
  let neverVar: never;

  undefinedVar = anyVar; //any -> undefined:다운캐스팅 가능
  anyVar = unknown; // unknown -> any:다운캐스팅 가능
  //neverVar = anyVar; // 유일하게 불가능한 타입
}
