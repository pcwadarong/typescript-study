# 유틸리티 타입

- 타입스크립트가 자체적으로 제공하는 특수한 타입들
- 제네릭, 맵드 타입, 조건부 타입 등의 타입 조작 기능을 이용해 실무에서 자주 사용되는 유용한 타입들을 모아 놓은 것
- [타입스크립트가 제공하는 다양한 유틸리티 타입들](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## 맵드 기반 유틸리티 타입

### `Partial<T>`

#### 설명

- Partial: 부분적인, 일부분의
- 특정 객체 타입의 모든 프로퍼티를 선택적 프로퍼티로 변환

#### 예제

```ts
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}

const draft: Post = {
  // ❌ tags 프로퍼티가 없음
  title: "제목은 나중에 짓자...",
  content: "초안...",
};
```

- `draft`라는 이름으로 모든 요소들을 정하지 않고 임시 저장한다고 했을 때, 다른 요소들이 없기 때문에 오류 발생

```ts
const draft: Partial<Post> = {
  title: "제목 나중에 짓자",
  content: "초안...",
};
```

- 따라서 `Post` 대신 `Partial<Post>`를 작성하면 모든 프로퍼티를 다 선택적 프로퍼티로 변환하여 오류를 해결한다.

#### 직접 구현

```ts
type Partial<T> = {
  [key in keyof T]?: T[key];
};

// = [key in [title | content | tags[] | thumbnailURL]?: T[key]

/* = {
  title?: string;
  tags?: string[];
  content?: string;
  thumbnailURL?: string;
} */
```

### `Required<T>`

#### 설명

- Required: 필수의, 필수적인
- 특정 객체 타입의 모든 프로퍼티를 필수(선택적이지 않은) 프로퍼티로 변환

#### 예제

```ts
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}

// 반드시 썸네일 프로퍼티가 존재해야 하는 게시글
const withThumbnailPost: Post = {
  title: "한입 타스 후기",
  tags: ["ts"],
  content: "",
  thumbnailURL: "https://...",
};
```

- `withThumbnailPost`는 반드시 썸네일이 포함된 게시글이어야 한다. 그런데 현재 `Post` 타입의 `thumbnailURL`가 선택적 프로퍼티로 설정되어 삭제하거나 주석처리해도 에러 검사가 되지 않는다.

```ts
const draft: Required<Post> = {
  // ❌ thumnailURL is missing
  title: "한입 타스 후기",
  tags: ["ts"],
  content: "",
};
```

- 따라서 `Post` 대신 `Required<Post>`를 작성하면 모든 프로퍼티를 다 필수 프로퍼티로 변환하여 오류를 해결한다.

#### 직접 구현

```ts
type Partial<T> = {
  [key in keyof T]: T[key];
};

// = [key in [title | content | tags[] | thumbnailURL]: T[key]

/* = {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
} */
```

### `Readonly<T>`

#### 설명

- Readonly: 읽기 전용
- 특정 객체 타입의 모든 프로퍼티를 읽기 전용 프로퍼티로 변환

#### 예제

```ts
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}

const readonlyPost: Post = {
  title: "보호된 게시글입니다.",
  tags: [],
  content: "",
};

readonlyPost.content = "해킹당함";
```

- `readonlyPost`는 보호받아야 하는 게시글로 내부의 값이 수정되면 안되지만, 현재는 readonly 설정이 안되어 있기 때문에 지금은 수정을 방지하지 못한다.

```ts
const readonlyPost: Readonly<Post> = {
  title: "보호된 게시글입니다.",
  tags: [],
  content: "",
};

readonlyPost.content = "해킹당함"; // ❌
```

- 따라서 `Post` 대신 `Readonly<Post>`를 작성하면 모든 프로퍼티를 다 읽기 전용 프로퍼티로 변환하여 오류를 해결한다.

#### 직접 구현

```ts
type Partial<T> = {
  readonly [key in keyof T]: T[key];
};

// = readonly [key in [title | content | tags[] | thumbnailURL]: T[key]

/* = {
  readonly title: string;
  readonly tags: string[];
  readonly content: string;
  readonly thumbnailURL?: string;
} */
```

### `Pick<T, K>`

#### 설명

- Pick: 뽑다, 고르다
- 특정 객체 타입으로부터 특정 프로퍼티 만을 골라 냄

#### 예제

```ts
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}

const legacyPost: Post = {
  // ❌
  title: "",
  content: "",
};
```

- `legacyPost`는 태그와 썸네일 기능이 추가되지 이저넹 만들어진 게시글이라고 했을 때, 이 변수를 `Post`로 설정하면 `tags` 프로퍼티 때문에 오류가 발생한다.
- 이전에 작성한 게시글마다 일일이 `tags`를 붙여줄 수 없고, 그렇다고 옛 게시글만을 위한 타입을 별도로 만들어 줄 수도 없다.

```ts
const legacyPost: Pick<Post, "title" | "content"> = {
  title: "",
  content: "",
};
// 추출된 타입 : { title : string; content : string }
```

- 따라서 `Post` 대신 `Pick<Post, propertys>`를 작성하면 `Post` 타입으로부터 `“title”`과 `“content”` 프로퍼티만 쏙 뽑아낸 객체 타입이 된다.

#### 직접 구현

```ts
// 1 단계
type Pick<T, K> = any;

// 2 단계: K에 해당하는 key 값과 value만 추출
type Partial<T, K> = {
  [key in K]: T[key];
};
```

- 3 단계
- 원래 extends 옆에는 String Literal Union 타입만 들어올 수 있는데, 현재 K에는 제약 조건이 없어 function, number 등 다양한 타입이 들어올 수 있어서 오류 발생

```ts
type Pick<T, K extends keyof T> = {
  // K extends 'title' | 'tags' | 'content' | 'thumbnailURL'
  // 'title' | 'content' extends 'title' | 'tags' | 'content' | 'thumbnailURL' ← true
  [key in K]: T[key];
};
```

### `Omit<T, K>`

#### 설명

- Omit: 생략하다, 빼다
- 특정 객체 타입으로부터 특정 프로퍼티 만을 제거

#### 예제

```ts
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}

const noTitlePost: Post = {
  // ❌
  content: "",
  tags: [],
  thumbnailURL: "",
};
```

- 제목이 없는(title 프로퍼티가 생략된) 게시글도 존재한다고 가정했을 때 현재는 오류가 발생함

```ts
const noTitlePost: Omit<Post, "title"> = {
  content: "",
  tags: [],
  thumbnailURL: "",
};
```

- 따라서 `Post` 대신 `Omit<Post, property>`를 작성하면 `Post` 타입으로부터 `“title”` 프로퍼티를 제외한 객체를 만들 수 있다.

#### 직접 구현

```ts
// 1 단계
type Omit<T, K> = any;

// 2 단계: K에 제약 추가
type Omit<T, K extends keyof T> = any;

// 3 단계:
type Omit<T, K extends keyof T> = {
  Pick<T, Exclude<keyof T, K>>;
};
```

- 3단계 추가 설명
- `keyof T`= `‘title’ | ‘content’ | ‘tags’ | ‘thumbnailURL’`
- `Pick<T, Exclude<keyof T, K>>`= `Pick<Post, Exclude<'title' | 'content' | 'tags' | 'thumbnailURL' , 'title>>`
- `Exclude`는 `U`로 제시된 `title`만 제거하기 때문에 `Pick<Post, 'content' | 'tags' | 'thumbnailURL'>`이 된다.
- 결국 `'content' | 'tags' | 'thumbnailURL'`을 골라 변수로 만드므로, 이는 즉슨 `title`을 제외한 나머지들을 고른다 = `title`만 `omit` 한다가 됩니다.

### `Record<K, V>`

- K로 프로퍼티의 유니온을, V로 각 프로퍼티의 벨류를 받아 객체로 만들어준다.

#### 예제

```ts
type Thumbnail = {
  large: {
    url: string;
  };
  medium: {
    url: string;
  };
  small: {
    url: string;
  };
};
```

- 화면 크기에 따라 반응형으로 세 가지 버전의 썸네일을 지원한다고 가정한다.
- 그런데 여기에 `watch` 버전이 또 추가되어야 한다.

```ts
type Thumbnail = Record<
  "large" | "medium" | "small" | "watch",
  { url: string }
>;
```

- 이때 `Record<key, value>`로 프로퍼티 값과 벨류 값을 나열해주면 `watch`가 추가된 프로퍼티를 쉽게 만들 수 있다.

#### 직접 구현

```ts
// 1 단계: K 나열
type Record<K, V> = {
  [key in K]: V;
};

// 2 단계: 타입은 모르지만, 어떤 객체의 key 타입이라는 제약 추가
type Record<K extends keyof any, V> = {
  [key in K]: V;
};
```

## 조건부 타입 기반 유틸리티 타입

### `Exclude<T, K>`

- T로부터 U를 제거하는 타입

```ts
type A = Exclude<string | boolean, string>;
// boolean
```

#### 직접 구현

```ts
type Exclude<T, U> = T extends U ? never : T;
```

### `Extract<T, K>`

- T로 부터 U를 추출하는 타입

```ts
type B = Extract<string | boolean, boolean>;
// boolean
```

#### 직접 구현

```ts
type Extract<T, U> = T extends U ? T : never;
```

### `ReturnType<T>`

- 타입변수 T에 할당된 함수 타입의 반환값 타입을 추출하는 타입

```ts
function funcA() {
  return "hello";
}

function funcB() {
  return 10;
}

type ReturnA = ReturnType<typeof funcA>; // string
type ReturnB = ReturnType<typeof funcB>; // number
```

#### 직접 구현

```ts
// 1단계: 함수만을 받아야 함
type ReturnType<T extends () => any>

// 2단계: 매개변수로는 제한이 없음
type ReturnType<T extends (...args: any) => any>

// 3단계: infer을 사용하여 비교한다
type ReturnType<T extends (...args: any) => any> = T extends (
  ...agrs: any
) => infer R
  ? R
  : never;
```
