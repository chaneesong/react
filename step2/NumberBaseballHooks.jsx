import React, { useState } from 'react';
import TryHooks from './TryHooks';

const getNumbers = () => {
  const candidate = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const arr = [];

  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    arr.push(chosen);
  }
  return arr;
};

const checkInput = (input, tries) => {
  if (isNaN(Number(input))) return alert('숫자만 입력하세요');
  const triesValueArr = tries.map((v) => v.value);
  if (triesValueArr.includes(input)) return alert('중복 입력입니다.');
  return true;
};

const NumberBaseballHooks = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [tries, setTries] = useState([]);
  const [answer, setAnswer] = useState(getNumbers);

  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log(answer);
    if (!checkInput(value, tries)) return;
    if (value === answer.join('')) {
      setResult('홈런');
      setTries([...tries, { value: value, result: '홈런' }]);
      setValue('');
      return;
    }
    let strike = 0;
    let ball = 0;
    answer.forEach((v, i) => {
      if (v === value[i]) strike++;
      else if (value.includes[i]) ball++;
    });
    setTries([...tries, { value: value, result: strike || ball ? `${strike}s ${ball}b` : 'OUT!' }]);
    setValue('');
    if (tries.length >= 3) {
      alert(`기회를 모두 소진하였습니다. 정답은 ${answer.join('')} 게임을 다시 시작합니다.`);
      setTries([]);
      setValue('');
      setAnswer(getNumbers());
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input type='text' maxLength={4} value={value} onChange={onChangeInput} />
        <button>입력</button>
      </form>
      <div>시도: {tries.length}</div>
      {tries.map((v, i) => (
        <TryHooks key={v.value} TriInfo={v} />
      ))}
    </>
  );
};

export default NumberBaseballHooks;
