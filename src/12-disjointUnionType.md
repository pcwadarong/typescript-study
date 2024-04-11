## 서로소 유니온 타입 (태그드 유니온 타입)

교집합이 없는 타입들 즉 서로소 관계에 있는 타입들을 모아 만든 유니온 타입

```ts
type Admin = {
  name: string;
  kickCount: number;
};

type Member = {
  name: string;
  point: number;
};

type Guest = {
  name: string;
  visitCount: number;
};

type User = Admin | Member | Guest; //유니온 타입 생성

function login1(user: User) {
  if ("kickCount" in user) {
    // Admin
    console.log(`${user.name}님 현재까지 ${user.kickCount}명 추방했습니다`);
  } else if ("point" in user) {
    // Member
    console.log(`${user.name}님 현재까지 ${user.point}모았습니다`);
  } else {
    // Guest
    console.log(`${user.name}님 현재까지 ${user.visitCount}번 오셨습니다`);
  }
}
```

- 위의 코드도 문제가 없고 잘 작동하지만, 제 3자가 타입을 알아보기 어려움
- 이때 서로소 유니온 타입을 사용함 => 각 타입에 `tag` 프로퍼티를 추가!

```ts
type Admin = {
  tag: "ADMIN";
  name: string;
  kickCount: number;
};

type Member = {
  tag: "MEMBER";
  name: string;
  point: number;
};

type Guest = {
  tag: "GUEST";
  name: string;
  visitCount: number;
};

type User = Admin | Member | Guest;

function login2(user: User) {
  switch (user.tag) {
    case "ADMIN": {
      console.log(`${user.name}님 현재까지 ${user.kickCount}명 추방했습니다`);
      break;
    }
    case "MEMBER": {
      console.log(`${user.name}님 현재까지 ${user.point}모았습니다`);
      break;
    }
    case "GUEST": {
      console.log(`${user.name}님 현재까지 ${user.visitCount}번 오셨습니다`);
      break;
    }
  }
}
```

- 이전까지의 집합 구조를 살펴보면, `name`, `kickCount`, `point`, `visitCount`가 모두 있는 조합의 가능성으로 인해 교집합이 생성되었음
- 하지만 `tag`를 각각 부여해줌으로써 `tag`가 `ADMIN`이면서 `MEMBER`일 순 없으므로 교집합이 사라지고 서로소가 됨
- 따라서 태그의 이름으로 간결하게 좁힐 수 있다

### 비동기 작업의 결과를 처리하는 객체 예시

```ts
type AsyncTask = {
  state: "LOADING" | "FAILED" | "SUCCESS";
  error?: {
    message: string;
  };
  response?: {
    message: string;
  };
};

const loading: AsyncTask = {
  state: "LOADING",
};

const failed: AsyncTask = {
  state: "FAILED",
  error: {
    message: "error type...",
  },
};

const success: AsyncTask = {
  state: "SUCCESS",
  response: {
    message: "data...",
  },
};

function processResult(task: AsyncTask) {
  switch (task.state) {
    case "LOADING": {
      console.log("loading..");
      break;
    }
    case "FAILED": {
      //console.log(`error : $(task.error.message)`); ❌ error
      console.log(`error : $(task.error?.message)`);
      break;
    }
    case "SUCCESS": {
      //console.log(`success : $(task.success.message)`); ❌ error
      console.log(`success : $(task.success!.message)`);
      break;
    }
  }
}
```

- 현재는 `error`나 `success`가 `null`이나 `undefined` 일 수 있기 때문에 옵셔널 체이닝 (`?`) 혹은 non null (`!`) 기호를 뒤에 써 줘야만 동작함
- 이때 서로소 유니온 타입을 사용하면 간결하게 바꿀 수 있음

```ts
type LoadingTask = {
  state: "LOADING";
};

type FailedTask = {
  state: "FAILED";
  error: {
    message: "error type...";
  };
};

type SuccessTask = {
  state: "SUCCESS";
  response: {
    message: "data...";
  };
};

type AsyncTaks = LoadingTask | FailedTask | SuccessTask;

function processResult(task: AsyncTask) {
  switch (task.state) {
    case "LOADING": {
      console.log("loading..");
      break;
    }
    case "FAILED": {
      console.log(`error : $(task.error?.message)`);
      break;
    }
    case "SUCCESS": {
      console.log(`success : $(task.success!.message)`);
      break;
    }
  }
}
```
