import React, { useState } from 'react';
import './App.css';

// Import Components
// import Nav from './components/Nav'
// import Tweets from './components/Tweets'

function App() {

  // let counter = 0;
  const [counter, setCounter] = useState(0)

  const [toggle, setToggle] = useState(false)
  

  const incrementor = () => {
    // counter += 1;
    // setCounter(prev => prev + 1)
    setCounter(counter + 1)
    console.log(counter)
  }

  const toggleElement = () => {
    setToggle(prev => !prev)
  }

  return (
    <div className="App">
      <h1 className={toggle ? 'active' : ""}>Hello React</h1>
      <h2>Counter {counter}</h2>
      <button onClick={incrementor}>Click</button>
      <button onClick={toggleElement}>Toggle</button>
    </div>
  );
}

export default App;


