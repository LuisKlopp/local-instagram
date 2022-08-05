import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { hello } from './store';
import { useEffect } from 'react';


function App() {

const state = useSelector((state)=>state)
console.log(state.helloRedux) // state 잘 가져옴

const dispatch = useDispatch()

const confirm = ()=>{ dispatch(hello('화이팅!')) } // dispatch 잘 가져옴




  return (
    <div className="App">
      <h1>Hello, react!</h1>
      <button onClick={ confirm }>Redux 확인 버튼</button>
    </div>
  );
}

export default App;