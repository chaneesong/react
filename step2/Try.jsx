import React, { PureComponent } from 'react';

class Try extends PureComponent {
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
