import './App.css';
import { useState, useRef } from 'react';
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

  const onClickDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>Todo</h1>
      <Editor onClickAdd={onClickAdd} />
      <div>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} onClickDelete={onClickDelete} />
        ))}
      </div>
    </div>
  );
}

export default App;
