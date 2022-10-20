const React = require('react');
const { Component, useRef } = React;

class WordRelay extends Component {
  state = {
    word: '바나나',
    value: '',
    result: '',
  };
  input;

  onRefInput = (c) => {
    this.input = c;
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        result: '정답',
        word: this.state.value,
        value: '',
      });
    } else {
      this.setState({
        result: '오답',
        value: '',
      });
    }
    this.input.focus();
  };

  onChangeInput = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.onRefInput} type='text' onChange={this.onChangeInput} value={this.state.value} />
          <button>입력</button>
          <div>{this.state.result}</div>
        </form>
      </>
    );
  }
}

module.exports = WordRelay;
