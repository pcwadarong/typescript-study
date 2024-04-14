import './App.css';
import { useState, useRef, useEffect } from 'react';

function App() {
  //todos의 타입 객체로 정의
  interface Todo {
    id: number;
    content: string;
  }

  //const [text, setText] = useState(); 초기값이 없으면 text는 undefined
  //const [text, setText] = useState<string>(); //text: string | undefined <- string으로 명시, 초기값은 빈 값
  const [text, setText] = useState(''); //초기값 string으로 자동 추론
  // Todo 타입을 배열로 가져오는 타입 정의
  const [todos, setTodos] = useState<Todo[]>([]);

  // id를 하나씩 증가하도록 설정하기 위한 ref
  const idRef = useRef(0);

  // e의 타입은 onChange = (e) => {} 했을 때 상단에 나오는 이미 정의된 타입을 드래그해서 가지고 옴
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onClickAdd = () => {
    setTodos([
      ...todos,
      {
        id: idRef.current++,
        content: text,
      },
    ]);
    //text 초기화
    setText('');
  };

  useEffect(()=>{})
  
  return (
    <div className="App">
      <h1>Todo</h1>
      <input value={text} onChange={onChangeInput} />
      <button onClick={onClickAdd}>add</button>
    </div>
  );
}

export default App;
