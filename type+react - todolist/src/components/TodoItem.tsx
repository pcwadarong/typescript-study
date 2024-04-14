import { Todo } from '../types';
interface Props extends Todo {}

export default function TodoItem(props: Props) {
  return (
    <li>
      {props.id}번: {props.content}
    </li>
  );
}
