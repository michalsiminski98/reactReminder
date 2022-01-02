import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { counterContext } from './App';


function Counter() {

    const value = useContext(counterContext);

  return (
      <span>{value}</span>
  );
}

export default Counter;
