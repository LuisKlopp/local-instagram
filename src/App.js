import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNumber, minusNumber, __addNumber, __getTodos} from "./store";
import { useEffect } from "react";


const App = () => {
  const dispatch = useDispatch();
  const { isLoading, error, todos } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  const [number, setNumber] = useState(0);
  const globalNumber = useSelector((state) => state.counter.number);

  const onChangeHandler = (evnet) => {
    const { value } = evnet.target;
    setNumber(+value);
  };

// thunk 함수를 디스패치한다. payload는 thunk함수에 넣어주면, 
// 리덕스 모듈에서 args로 받을 수 있다.
  const onClickAddNumberHandler = () => {
    dispatch(__addNumber(number)); 
  };

  const onClickMinusNumberHandler = () => {
    dispatch(minusNumber(number));
  };

  if (isLoading) {
    return <div>로딩 중....</div>;
  }
  
  if (error) {
    return <div>{error.message}</div>;
  }


  return (
    <div>
      <div>{globalNumber}</div>
      <input type="number" onChange={onChangeHandler} />
      <button onClick={onClickAddNumberHandler}>더하기</button>
      <button onClick={onClickMinusNumberHandler}>빼기</button>

      <div>
      {todos.map((todo) => (
        <div kye={todo.id}>{todo.content}</div>
      ))}
    </div>
    </div>
  );
};

export default App;