import { React, useState } from 'react';

function Clock() {
  
  const [time, setTime ] = useState([[], [], []]);

  const Pip = ({ isOn }) => <div className={`pip ${isOn && "pip--on"}`}></div>;

  const BinaryDigit = ({ base2NumberAsArray }) => (
    <div className="binary-digit">
      {base2NumberAsArray.map((pip, idx) => (
        <Pip key={idx} isOn={pip === 1} />
      ))}
    </div>
  );
  
  const BinaryDigitGroup = ({ group }) => (
    <div className="binary-digit-group">
      {group.map((binaryDigit, idx) => (
        <BinaryDigit base2NumberAsArray={binaryDigit} key={idx} />
      ))}
    </div>
  );
  
  const numberToBinary = (base10Number) => {
    const base2Values = [8, 4, 2, 1];
    let output = [0, 0, 0, 0];
    let remainder = base10Number;
    
    base2Values.forEach((val, idx) => {
      const left = remainder - val;
    
      if (left >= 0) {
          output[idx] = 1;
          remainder = left;
        }
    });
    return output;
  }
    
  const numberAsBinaryArrayPair = (number) => {
    const pair = [];
    if (number < 10) {
      pair[0] = numberToBinary();
      pair[1] = numberToBinary(number);
    } else {
      const numberAsArray = String(number).split("");
      pair[0] = numberToBinary(parseInt(numberAsArray[0], 10));
      pair[1] = numberToBinary(parseInt(numberAsArray[1], 10));
    }
    
    return pair;
  }

  const setInput = (event) => {
    let value = event.target.value;
    value = value.split(':');
    setTime ([
      numberAsBinaryArrayPair(value[0]),
      numberAsBinaryArrayPair(value[1]),
      numberAsBinaryArrayPair(value[2]),
    ])
  }
  return (
    <div className="app">
      <div className="clock">
        {time.map((digit) => (
         <BinaryDigitGroup group={digit} />
        ))}
      </div>
      <form>
        <input placeholder="HH:MM:SS" onChange={setInput}></input><br/>
      </form>
    </div>
  ); 
}

export default Clock;


