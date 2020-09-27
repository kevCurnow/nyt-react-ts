import React from 'react';
import './App.css';
import  NYT from './components/NYT';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <div>
        <NYT />
      </div>
    </div>
  );
}

export default App;
