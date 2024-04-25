import { Todo } from '../types';

interface Props extends Todo {
  onClickDelete: (id: number) => void;
}

export default function TodoItem(props: Props) {
  const onClickBtn = () => {
    props.onClickDelete(props.id);
  };
  return (
    <li>
      {props.id}번: {props.content}
      <button onClick={onClickBtn}>삭제</button>
    </li>
  );
}
