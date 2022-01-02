import './App.css';
import { createContext, useEffect, useReducer, useRef, useState } from 'react';
import Counter from './Counter';

export const counterContext = createContext(0);

const initialState = {
  isRunning: false,
  time: 0,
};

function reducer(state, action) {
  switch(action.type){
    case 'start':
      return {...state, isRunning: true};
    case 'stop':
      return {...state, isRunning: false};
    case 'reset':
      return {time: 0, isRunning: false};
    case 'tick':
      return {...state, time: state.time + 1};
    default:
      throw new Error();
    }
}

function App() {


  const [counter, setCounter] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const timerInterval = useRef();
  

  useEffect(() => {
    if(state.isRunning){
      timerInterval.current = setInterval(() => {
          dispatch(({type: 'tick'}))
        }, 1000);
    } else{
      clearInterval(timerInterval.current);
    }
  },[state.isRunning])

  return (
    <counterContext.Provider value={counter}>
      <div className="App">
    
        <div>
          <Counter/>
          <button onClick={() => setCounter(prevValue => prevValue + 1)}>+1</button>
        </div>
        <div>
          <span>{Math.floor(state.time)}</span>
          <button onClick={() => dispatch({type: 'start'})}>start</button>
          <button onClick={() => dispatch({type: 'stop'})}>stop</button>
          <button onClick={() => dispatch({type: 'reset'})}>reset</button>
        </div>

      </div>
    </counterContext.Provider>
  );
}

export default App;
