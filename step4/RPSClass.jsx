import React, { Component } from 'react';

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

class RPSClass extends Component {
  state = {
    result: '',
    imgCoord: '0',
    score: 0,
  };

  interval;

  changeHand = () => {
    const { imgCoord } = this.state;
    if (imgCoord === rpsCoords.rock) {
      this.setState({
        imgCoord: rpsCoords.scissior,
      });
    } else if (imgCoord === rpsCoords.scissior) {
      this.setState({
        imgCoord: rpsCoords.paper,
      });
    } else if (imgCoord === rpsCoords.paper) {
      this.setState({
        imgCoord: rpsCoords.rock,
      });
    }
  };

  componentDidMount() {
    this.interval = setInterval(this.changeHand, 100);
  }

  componentWillUnmount() {}

  onClickBtn = (choice) => () => {
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      this.setState({
        result: '비겼습니다.',
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: '이겼습니다.',
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: '졌습니다.',
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100);
    }, 2000);
  };

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div id='computer' style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id='rock' className='btn' onClick={this.onClickBtn('rock')}>
            바위
          </button>
          <button id='paper' className='btn' onClick={this.onClickBtn('scissior')}>
            가위
          </button>
          <button id='scissor' className='btn' onClick={this.onClickBtn('paper')}>
            보
          </button>
        </div>
        <div>{result}</div>
        <div>점수: {score}점</div>
      </>
    );
  }
}

export default RPSClass;
