const React = require('react');
const { Component, useRef } = React;

// class Gugudan extends Component {
//   state = {
//     first: Math.floor(Math.random() * 9) + 1,
//     second: Math.floor(Math.random() * 9) + 1,
//     value: '',
//     result: '',
//   };

//   onSubmit = (e) => {
//     e.preventDefault();
//     if (this.state.first * this.state.second === parseInt(this.state.value)) {
//       this.setState({
//         result: '정답' + ' ' + this.state.value,
//         value: '',
//         first: Math.floor(Math.random() * 9) + 1,
//         second: Math.floor(Math.random() * 9) + 1,
//       });
//     } else {
//       this.setState({
//         result: '오답' + ' ' + this.state.value,
//         value: '',
//       });
//     }
//   };

//   onChange = (e) => {
//     this.setState({
//       value: e.target.value,
//     });
//   };

//   render() {
//     return (
//       <div>
//         <div>
//           {this.state.first} X {this.state.second}
//         </div>
//         <form onSubmit={this.onSubmit}>
//           <input type='number' value={this.state.value} onChange={this.onChange} />
//           <button>입력</button>
//         </form>
//         <div>
//           {this.state.answer} {this.state.result}
//         </div>
//       </div>
//     );
//   }
// }

const Gugudan = () => {
  const [first, setFirst] = React.useState(Math.floor(Math.random() * 9) + 1);
  const [second, setSecond] = React.useState(Math.floor(Math.random() * 9) + 1);
  const [value, setValue] = React.useState('');
  const [result, setResult] = React.useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (first * second === parseInt(value)) {
      setResult(value + ' ' + '정답');
      setValue('');
      setFirst(Math.floor(Math.random() * 9) + 1);
      setSecond(Math.floor(Math.random() * 9) + 1);
    } else {
      setResult(value + ' ' + '오답');
      setValue('');
    }
    inputRef.current.focus();
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>
        {first} X {second}
      </div>
      <form onSubmit={onSubmitForm}>
        <input type='number' ref={inputRef} onChange={onChangeInput} value={value} />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = Gugudan;
