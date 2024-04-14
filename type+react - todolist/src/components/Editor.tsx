import { useState, ReactElement } from 'react';

interface Props {
  onClickAdd: (text: string) => void;
  // ❗ 2. Props에도 정의해줘야 한다.
  children: ReactElement;
}

export default function Editor(props: Props) {
  //const [text, setText] = useState(); 초기값이 없으면 text는 undefined
  //const [text, setText] = useState<string>(); //text: string | undefined <- string으로 명시, 초기값은 빈 값
  const [text, setText] = useState(''); //초기값 string으로 자동 추론

  // e의 타입은 onChange = (e) => {} 했을 때 상단에 나오는 이미 정의된 타입을 드래그해서 가지고 옴
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onclickBtn = () => {
    props.onClickAdd(text);
    setText('');
  };

  return (
    <div>
      <input value={text} onChange={onChangeInput} />
      <button onClick={onclickBtn}>add</button>
    </div>
  );
}
