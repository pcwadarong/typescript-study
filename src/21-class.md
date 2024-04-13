# 타입스크립트의 클래스

- `class`의 필드를 선언할 때 타입 주석으로 타입을 함께 정의해주어야 한다.
- 그렇지 않을 경우 암시적 `any`타입으로 추론되는데 추천하지 않음
- 생성자에서 필드의 값을 초기화하지 않을 경우 필드에서 초기값을 명시해야 한다.

```ts
class Employee {
  // 필드
  name: string = "";
  age: number = 0;
  position: string = "";

  // 메서드
  work() {
    console.log("일함");
  }
}
```

- 만약 마땅히 부여할 초기값이 없다면 생성자 함수를 만들어서 대체할 수 있다.

```ts
class Employee {
  // 필드
  name: string;
  age: number;
  position: string;

  // 생성자
  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  // 메서드
  work() {
    console.log("일함");
  }
}
```

> 선택적 프로퍼티로 만들고 싶다면 필드의 이름 뒤에 물음표를 붙이면 된다.

---

- `class`는 자바스크립트의 `class`면서 동시에 타입스크립트의 타입으로 작용할 수 있다. (구조적 타입 시스템 때문)

```ts
class Employee {
  (...)
}

const employeeC: Employee = {
  name: "",
  age: 0,
  position: "",
  work() {},
};
```

## `class` 상속

```ts
class ExecutiveOfficer extends Employee {
  officeNumber: number;

  constructor(
    name: string,
    age: number,
    position: string,
    officeNumber: number
  ) {
    super(name, age, position);
    this.officeNumber = officeNumber;
  }
}
```

- 타입스크립트의 상속의 경우 `super` 를 무조건 사용해야 한다.

## 접근 제어자 (access modifier)

- 타입스크립트에서만 제공되는 기능으로 `class`의 특정 필드나 메서드를 접근할 수 있는 범위를 설정함
- 3개의 접근 제어자(public, private, protected)를 사용할 수 있음

### public

- 모든 범위에서 접근 가능
- 접근 제어자를 지정하지 않을 시 기본값으로 할당

```ts
class Employee {
  // 자동으로 public
  name: string;
  // 명시도 가능
  public age: number;
  position: string;
}
```

### private

- `class` 내부에서만 접근 가능
- 파생(상속) `class`에서도 접근 불가능

```ts
class Employee {
  // private 접근 제어자 설정
  private name: string;
  public age: number;
  public position: string;

  work() {
    console.log(`${this.name}이 일함`); // 여기서는 접근 가능
  }
}

const employee = new Employee("이정환", 27, "devloper");
employee.name = "홍길동"; // ❌ 오류
```

### protected

- private과 public의 중간
- `class` 내부 또는 파생(상속) `class` 내부에서만 접근 가능

```ts
class Employee {
  private name: string;
  protected age: number;
  public position: string;

  work() {
    console.log(`${this.name}이 일함`); // 여기서는 접근 가능
  }
}

class ExecutiveOfficer extends Employee {
  // 메서드
  func() {
    this.name; // ❌ 오류
    this.age; // ✅ 가능
  }
}

const employee = new Employee("이정환", 27, "devloper");

employee.name = "홍길동"; // ❌ 오류
employee.age = 30; // ❌ 오류
employee.position = "디자이너";
```
### 필드 생략하기
- 생성자에 접근 제어자를 붙일 경우, 필드에 자동으로 붙게 되어 중복 코드가 발생한다.
- 따라서 필드 자체를 생략해야 한다.
- 심지어, `this.` 부분을 삭제해도 괜찮다.
```ts
class Employee {
  // 필드
  private name: string;    // ❌
  protected age: number;   // ❌
  public position: string; // ❌

  // 생성자
  constructor(
    private name: string,
    protected age: number,
    public position: string
  ) {
    this.name = name; // 생략 가능
    this.age = age; // 생략 가능
    this.position = position; // 생략 가능
  }

  // 메서드
  work() {
    console.log(`${this.name} 일함`);
  }
}
```

## 인터페이스와 클래스
- 타입스크립트의 `interface`는 `class`에 어떤 필드들이 존재하고, 어떤 메서드가 존재하는지 정의하는 설계도 역할을 할 수 있다.
```ts
interface CharacterInterface {
  name: string;
  moveSpeed: number;
  move(): void;
}

class Character implements CharacterInterface {
    name: string;
    moveSpeed: number;

  constructor(name: string, moveSpeed: number) {
    this.name = name;
    this.moveSpeed = moveSpeed;
  }

  move(): void {
    console.log(`${this.moveSpeed} 속도로 이동!`);
  }
}
```
- 사실 `interface`를 먼저 정의하고 `class`를 만드는 일은 별로 없지만, 라이브러리 등 이미 정해진 코드를 수정할 때 사용할 수 있다.
- `implements`를 통해 `interface`를 구현하는 `class`를 만들면 된다.
- 그런데 `interface`의 접근 제어자는 `public`만 용인되므로 생성자의 매개변수의 접근 제어자에 `public`을 붙인 후 필드와 `this`부분을 생략하면 더 깔끔한 코드를 작성할 수 있다.
- 만약 `private` 한 매개변수를 받고 싶다면 `private extra:`를 통해 따로 선언해줘야 한다.

```ts
interface CharacterInterface {
  name: string;
  moveSpeed: number;
  move(): void;
}

class Character implements CharacterInterface {
  constructor(
    public name: string,
    public moveSpeed: number,
    private extra: string
  ) {}

  move(): void {
    console.log(`${this.moveSpeed} 속도로 이동!`);
  }
}
```