import './App.css';
import { useState, useRef, useEffect } from 'react';
import Editor from './components/Editor';
import TodoItem from './components/TodoItem';
import { Todo } from './types';

function App() {
  // Todo 타입을 배열로 가져오는 타입 정의
  const [todos, setTodos] = useState<Todo[]>([]);

  // id를 하나씩 증가하도록 설정하기 위한 ref
  const idRef = useRef(0);

  const onClickAdd = (text: string) => {
    setTodos([
      ...todos,
      {
        id: idRef.current++,
        content: text,
      },
    ]);
  };

  //화면에 리스트를 띄우기 전에 작동하는지 확인하기 위함
  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <div className="App">
      <h1>Todo</h1>
      <Editor onClickAdd={onClickAdd} />
      <div>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </div>
    </div>
  );
}

export default App;
