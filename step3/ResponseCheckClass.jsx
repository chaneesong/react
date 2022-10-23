import React, { PureComponent } from 'react';

class ResponseCheckClass extends PureComponent {
  state = {
    state: 'waiting',
    message: '클릭하면 시작됩니다.',
    result: [],
  };

  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const { state, message, result } = this.state;

    if (state === 'waiting') {
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요.',
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now',
          message: '클릭하세요!',
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') {
      clearTimeout(this.timeout);
      this.setState({
        state: 'waiting',
        message: '초록색화면에 클릭하셔야 합니다. 다시 시작하세요.',
      });
    } else if (state === 'now') {
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          state: 'waiting',
          message: '초록색이 되면 클릭하세요',
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };

  renderAverage = () => {
    const { result } = this.state;
    const timeEverage = Math.floor(result.reduce((a, c) => a + c, 0) / result.length);
    return result.length ? <div>평균 시간: {timeEverage}ms</div> : null;
  };

  render() {
    const { state, message } = this.state;
    return (
      <>
        <div id='screen' className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

export default ResponseCheckClass;
