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
function printAuthorInfo(author: Post["author"]['id']) {
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
type Tup4 = Tup[number] // number | string | boolean : union
```