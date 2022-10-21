import React, { Component } from 'react';

class Try extends Component {
  render() {
    return (
      <>
        <div>
          {this.props.value.value} - {this.props.value.result}
        </div>
      </>
    );
  }
}

export default Try;
