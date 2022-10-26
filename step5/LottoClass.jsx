import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('render');
  const candidate = Array.from(new Array(45), (v, i) => i + 1);
  const shuffle = [];

  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((a, b) => a - b);
  return [...winNumbers, bonusNumber];
}

class LottoClass extends Component {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  };

  timeouts = [];

  runTimeouts = () => {
    const { winNumbers } = this.state;
    console.log(winNumbers);
    let timeout;
    for (let i = 0; i < this.state.winNumbers.length - 1; i++) {
      timeout = setTimeout(() => {
        this.setState((prevState) => {
          return { winBalls: [...prevState.winBalls, winNumbers[i]] };
        });
      }, (i + 1) * 500);
      this.timeouts.push(timeout);
    }
    timeout = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, winNumbers.length * 500);
    this.timeouts.push(timeout);
  };

  componentDidMount() {
    this.runTimeouts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
  }

  componentWillUnmount() {
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  }

  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id='result'>
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더</button>}
      </>
    );
  }
}

export default LottoClass;
