// 타입 별칭

let user1: {
  id: number;
  name: string;
  nickname: string;
  birth: string;
  bio: string;
  location: string;
} = {
  id: 1,
  name: "이정환",
  nickname: "winterlood",
  birth: "1997.01.07",
  bio: "안녕하세요",
  location: "부천시",
};

let user2: {
  id: number;
  name: string;
  nickname: string;
  birth: string;
  bio: string;
  location: string;
} = {
  id: 1,
  name: "이정환",
  nickname: "winterlood",
  birth: "1997.01.07",
  bio: "안녕하세요",
  location: "부천시",
};

// 이런 식으로 계속해서 만들면 중복 코드 발생
// 따라서 미리 타입을 선언함

type User = {
  id: number;
  name: string;
  nickname: string;
  birth: string;
  bio: string;
  location: string;
};
//단 let과 같이 중복으로 선언 x
// 대신 전역, 지역 변수 형식으로 함수 안에서 다시 선언 o

let user3: User = {
  id: 1,
  name: "이정환",
  nickname: "winterlood",
  birth: "1997.01.07",
  bio: "안녕하세요",
  location: "부천시",
};

let user4: User = {
  id: 2,
  name: "홍길동",
  nickname: "winterlood",
  birth: "1997.01.07",
  bio: "안녕하세요",
  location: "부천시",
};

//인덱스 시그니처
type CountryCodes = {
  Korea: string;
  UnitedState: string;
  UnitedKingdom: string;
  // (... 약 100개의 국가)
  Brazil: string;
};

let countryCodes: CountryCodes = {
  Korea: "ko",
  UnitedState: "us",
  UnitedKingdom: "uk",
  // (... 약 100개의 국가)
  Brazil: "bz",
};

//countryCodes가 매우 많다면 타입 정의에도 각각 모두 정의해주어야 함
// 따라서 아래와 같이 키 값과 벨류 값의 타입을 저장하는 유연한 문법을 사용함

type countryNumCodes = {
  [key: string]: number;
  Korea: number; //대신 해당 문법을 위반하지만 않으면 오류가 발생하지 않아 빈 배열도 허용하는데, 이처럼 무조건 있어야 하는 요소를 설정할 수 있음
};

let countryNumCodes: countryNumCodes = {
  Korea: 410,
  UnitedState: 840,
  UnitedKingdom: 826,
}; 