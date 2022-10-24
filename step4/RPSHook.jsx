import React, { useState, useRef, useEffect } from 'react';

const rpsCoords = {
  rock: '0',
  scissior: '-142px',
  paper: '-284px',
};

const scores = {
  rock: 0,
  scissior: 1,
  paper: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rpsCoords).find((v) => v[1] === imgCoord)[0];
};

const RPSHook = () => {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(rpsCoords['rock']);
  const [score, setScore] = useState(0);
  const interval = useRef(null);

  const changeHand = () => {
    if (imgCoord === rpsCoords.rock) {
      setImgCoord(rpsCoords.scissior);
    } else if (imgCoord === rpsCoords.scissior) {
      setImgCoord(rpsCoords.paper);
    } else if (imgCoord === rpsCoords.paper) {
      setImgCoord(rpsCoords.rock);
    }
  };

  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      setResult('draw');
    } else if ([-1, 2].includes(diff)) {
      setResult('win');
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult('lose');
      setScore((prevScore) => prevScore - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 1000);
  };

  useEffect(() => {
    interval.current = setTimeout(changeHand, 100);
    return () => clearInterval(interval.current);
  }, [imgCoord]);

  return (
    <>
      <div id='computer' style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id='rock' className='btn' onClick={onClickBtn('rock')}>
          바위
        </button>
        <button id='paper' className='btn' onClick={onClickBtn('scissior')}>
          가위
        </button>
        <button id='scissor' className='btn' onClick={onClickBtn('paper')}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>점수: {score}점</div>
    </>
  );
};

export default RPSHook;
