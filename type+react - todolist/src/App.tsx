import './App.css';
import { useRef, useReducer, useEffect } from 'react';
import Editor from './components/Editor';
import TodoItem from './components/TodoItem';
import { Todo } from './types';

// 타입 스크립트에서는 액션 객체의 타입을 주로 서로소 유니온으로 선언
type Action =
  | {
      type: 'CREATE';
      data: {
        id: number;
        content: string;
      };
    }
  | { type: 'DELETE'; id: number };

function reducer(state: Todo[], action: Action) {
  switch (action.type) {
    case 'CREATE': {
      return [...state, action.data];
    }
    case 'DELETE': {
      return state.filter((item) => item.id !== action.id);
    }
  }
}

function App() {
  // Todo 타입을 배열로 가져오는 타입 정의
  //const [todos, setTodos] = useState<Todo[]>([]);
  // useReducer로 대치
  const [todos, dispatch] = useReducer(reducer, []);

  // id를 하나씩 증가하도록 설정하기 위한 ref
  const idRef = useRef(0);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  const onClickAdd = (text: string) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        content: text,
      },
    });
  };

  const onClickDelete = (id: number) => {
    dispatch({
      type: 'DELETE',
      id: id,
    });
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
