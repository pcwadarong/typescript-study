## 인터페이스 선언 합침 (Declaration Merging)
타입 별칭과 다르게 돌일한 스코프 내에 중복된 이름으로 선언 가능
```ts
interface Person {
  name: string;
}

interface Person { // ✅
  age: number;
}

// 아래와 같음
interface Person {
	name: string;
	age: number;
}
```

## 주의사항
- 동일한 이름의 인터페이스들이 동일한 이름의 프로퍼티를 서로 다른 타입으로 정의(충돌)한다면 오류가 발생
```ts
interface Person {
  name: string;
}

interface Person {
  name: "hello"; // ❌
  name: number; // ❌
  age: number;
}
```
