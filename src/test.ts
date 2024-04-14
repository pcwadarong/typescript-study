console.log("hello");
let a: number = 5;

type FuncA = string;
type FuncB = number;

type ReturnType<T> = T extends () => string ? string : T;

type A = ReturnType<FuncA>;
type B = ReturnType<FuncB>;