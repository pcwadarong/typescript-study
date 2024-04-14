# 타입 조작하기
- 원래 존재하던 타입들을 상황에 따라 유동적으로 다른 타입으로 변환하는 기능

```ts
interface {
    a: string;
    b: string | number; // 타입 조작
}
```

# 타입을 조작하는 방법
- 제네릭
- 조건부 타입
- 인덱스드 엑세스 타입
- keyof 연산자
- Mapped(맵드) 타입
- 템플릿 리터럴 타입

## 인덱스트 엑세스 타입

- 인덱스를 이용하여 객체, 배열, 튜플 타입으로부터 특정 프로퍼티나 특정 요소의 타입만 추출함

### 객체타입에서 추출

- 특정 `Post`의 인터페이스를 만들고, 어떠한 객체 `post`를 만든 후 그 `post`의 `author` 아이디와 이름만 추출하는 함수를 만들었다.

```ts
interface Post {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
  };
}

function printAuthorInfo(author: { id: number; name: string }) {
  console.log(`${author.id} - ${author.name}`);
}

const post: Post = {
  title: "게시글 제목",
  content: "게시글 본문",
  author: {
    id: 1,
    name: "이정환",
  },
};
```

- 만약 여기서 `author`의 age나, location 등 다른 정보를 추가하게 되면 인터페이스와 객체, 함수에 모조리 다 속성: 타입을 추가해야 하기 때문에 번거롭다. 이럴 경우 인덱스드 엑세스 타입을 사용하면 편리하게 수정 가능하다.

```ts
interface Post {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    age: number; // 추가
  };
}


function printAuthorInfo(author: Post["author"]) {
  console.log(`${author.id} - ${author.name}`);
}

(...)
```

- 이렇게 대괄호를 통해 `author` 프로퍼티의 타입만 추출한다면 다른 프로퍼티를 추가하더라도 오류가 발생하지 않는다.
- 이때 대괄호 속에 들어가는 String Literal 타입인 `author` 를 인덱스라고 한다.
- 단, 해당 인덱스에는 실제 존재하는 `type`만 들어갈 수 있다.
- 따라서 어떤 값을 변수에 저장한 후 인덱스에 사용하려고 한다거나, 존재하지 않은 프로퍼티 네임을 쓰면 오류가 발생한다.

```ts
function printAuthorInfo(author: Post["author"]["id"]) {
  // author 타입: number
  console.log(`${author.id} - ${author.name}`);
}
```

- 중첩으로 대괄호를 사용하여 추출할 수도 있다.

### 배열 타입에서 추출

- 타입 옆 대괄호에 `number`혹은 `number literal` 타입을 넣게 되면 배열의 요소 타입을 추출할 수 있다.

```ts
type PostList = {
  title: string;
}[];

// number
const post: PostList[number] = {
  title: "게시글 제목",
};

//number
function printAuthorInfo(author: PostList[number]["title"]) {}

// number literal
const post: PostList[0] = {
  title: "게시글 제목",
};
```

### 튜플 타입에서 추출

```ts
type Tup = [number, string, boolean];

type Tup0 = Tup[0]; // number
type Tup1 = Tup[1]; // string
type Tup2 = Tup[2]; // boolean
type Tup3 = Tup[3]; // ❌ 해당하는 값 없음
type Tup4 = Tup[number]; // number | string | boolean : union
```

## Keyof 연산자

- 객체 타입으로부터 프로퍼티의 모든 `key`들을 `String Literal Union` 타입으로 추출하는 연산자

```ts
interface Person {
  name: string;
  age: number;
}

function getPropertyKey(person: Person, key: "name" | "age") {
  return person[key];
}

const person: Person = {
  name: "이정환",
  age: 27,
};
```

- 현재는 key 값을 가져올 때 `"name" | "age"` 로 각 타입을 명시하고 있다. 그런데 이렇게 할 경우 `Person`의 프로퍼티가 늘어날 때 똑같이 함수에도 추가해줘야 한다.
- 이 경우 대신 `keyof` 연산자를 활용하는 게 좋다.

```ts
function getPropertyKey(person: Person, key: keyof Person) {
  return person[key];
}
```

- `keyof Person`의 결과값은 `“name” | “age”`이다. 이는 모든 프로퍼티 key를 String Literal Union 타입으로 추출한다.
- 단, 오직 타입에만 적용할 수 있기 때문에 아래와 같이 사용하면 오류가 발생한다.

```ts
function getPropertyKey(person: Person, key: keyof person) {
  // ❌
  return person[key];
}

const person: Person = {};
```

### Typeof + keyof

- `typeof`는 특정 값의 타입을 문자열로 변환하는 연산자이다.
- 그러나 타입을 정의할 때 사용하면 특정 변수의 타입을 추론할 수 있다.

```ts
const person: Person = {
  name: "이정환",
  age: 27,
  location: "인천",
};

type Person = typeof person;
// {name: string, age: number, location:string}
```

- 이러한 특징을 활용하여 `keyof` 연산자를 다음과 같이 사용할 수 있다.

```ts
function getPropertyKey(person: Person, key: keyof typeof person) {
  return person[key];
} // “name” | “age” | “location”

const person: Person = {
  name: "이정환",
  age: 27,
};
```

## 맵드 타입

- 기존의 객체 타입을 기반으로 새로운 객체 타입을 만드는 타입 조작 기능

- 유저 정보가 서버에 저장되어 있다고 가정하고 유저 정보를 가져오거나 수정하는 기능을 만들어 보자.

```ts
interface User {
  id: number;
  name: string;
  age: number;
}

function fetchUser(): User {
  return {
    id: 1,
    name: "이정환",
    age: 27,
  };
}

function updateUser(user: User) {
  // ... 유저 정보 수정 기능
}
```

- 이 상황에서 `age`만 수정해서 다시 보내고 싶은데, `updateUser` 함수의 매배견수 타입이 `User`로 되어 있기 때문에 업데이트가 필요없는 `id, name, age`까지 한번에 보내야 한다.
- 이럴 때 맵드 타입을 이용하면 유용하다.

```ts
interface User {
  id: number;
  name: string;
  age: number;
}

type PartialUser = {
  [key in "id" | "name" | "age"]?: User[key];
};

(...)
```

- 우선 맵드 타입은 `interface` 사용이 불가능하기에 `type`로 수정한다.
- 인덱스를 쓰는 것처럼 대괄호를 연 후 `key in` 오른쪽에 `User`의 모든 프로퍼티를 적어준다. (`key`의 가능한 값들을 나열)
- 그 후 콜론과 함께 `User[key]`를 적어 `key`에 해당하는 `value`의 타입을 적어준다.
- 마지막으로 대괄호 바로 뒤에 `?`를 적어 선택적 프로퍼티로 만들어준다.

```ts
// 다음과 같은 타입을 작성한 것
{
  id?: number;
  name?: string;
  age?: number;
}
```

- 만약 프로퍼티의 종류가 많아져 모두 나열하기 힘들 경우 `keyof` 연산자를 추가로 활용한다.

```ts
type PartialUser = {
  [key in keyof User]?: User[key];
};
// key는 T, U등 다른 값으로도 작성 가능
```

> 추가적으로, `readonly` 타입을 반환해야 할 경우 아래와 같이 작성하면 된다.
>
> ```ts
> type ReadonlyUser = {
>   readonly [key in keyof User]: User[key];
> };
> ```

## 템플릿 리터럴 타입

- 타입 조작 기능들 중 가장 단순한 기능
- 템플릿 리터럴을 이용해 특정 패턴을 갖는 `String` 타입을 만드는 기능
- 실제 사용 빈도는 낮음

```ts
type Color = "red" | "black" | "green";
type Animal = "dog" | "cat" | "chicken";

type ColoredAnimal = `red-dog` | 'red-cat' | 'red-chicken' | 'black-dog' ... ;

// 아래는 똑같은 결과를 반환합니다.
type ColoredAnimal = `${Color}-${Animal}`;
const coloredAnimal : ColoredAnimal = '';
// 빈 값 안에 모든 조합을 작성 가능
```
