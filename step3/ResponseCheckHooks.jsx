import React, { useState, useRef } from 'react';

const ResponseCheckHooks = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭하면 시작됩니다.');
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === 'waiting') {
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('클릭하세요!');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') {
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('초록색화면에 클릭하셔야 합니다. 다시 시작하세요.');
    } else if (state === 'now') {
      endTime.current = new Date();
      setState('waiting');
      setMessage('초록색이 되면 클릭하세요');
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  };

  const renderAverage = () => {
    const timeEverage = Math.floor(result.reduce((a, c) => a + c, 0) / result.length);
    return result.length ? <div>평균 시간: {timeEverage}ms</div> : null;
  };

  return (
    <>
      <div id='screen' className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponseCheckHooks;
