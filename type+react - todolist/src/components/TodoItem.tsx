import { Todo } from '../types';
import { useTodoDispatch } from '../App';

interface Props extends Todo {}

export default function TodoItem(props: Props) {
  const dispatch = useTodoDispatch();

  const onClickBtn = () => {
    dispatch.onClickDelete(props.id);
  };
  return (
    <li>
      {props.id}번: {props.content}
      <button onClick={onClickBtn}>삭제</button>
    </li>
  );
}
