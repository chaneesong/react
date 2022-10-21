import React, { Component } from 'react';
import Try from './Try';

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
  if (isNaN(Number(input))) return alert('숫자만 입력하세요.');
  const triesValueArr = tries.map((v) => v.value);
  if (triesValueArr.includes(input)) return alert('중복 입력입니다.');
  return true;
};

class NumberBaseballClass extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (!checkInput(this.state.value, this.state.tries)) return;
    if (this.state.value === this.state.answer.join('')) {
      this.setState({
        result: '홈런',
        tries: [...this.state.tries, { value: this.state.value, result: '홈런' }],
        value: '',
      });
      return;
    }
    let strike = 0;
    let ball = 0;
    this.state.answer.map((v, i) => {
      if (v === this.state.value[i]) strike++;
      else if (this.state.value.includes(v)) ball++;
    });
    this.setState({
      tries: [
        ...this.state.tries,
        { value: this.state.value, result: strike || ball ? `${strike}s ${ball}b` : 'OUT!' },
      ],
      value: '',
    });
    if (this.state.tries.length >= 2) {
      alert(`기회를 모두 소진하였습니다. 정답은 ${this.state.answer.join('')} 게임을 다시 시작합니다.`);
      this.setState({
        tries: [],
        value: '',
        answer: getNumbers(),
      });
      return;
    }
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input type='text' maxLength={4} onChange={this.onChangeInput} value={this.state.value} />
          <button>입력</button>
        </form>
        <div>시도: {this.state.tries.length}</div>
        {this.state.tries.map((v, i) => (
          <Try key={v.value} value={v} index={i} />
        ))}
      </>
    );
  }
}

export default NumberBaseballClass;
