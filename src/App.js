import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { hello } from './store';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {


  const [todo, setTodo] = useState({
    title: "",
  });

  const [todos, setTodos] = useState(null)

  const [targetId, setTargetId] = useState(null);
  const [editTodo, setEditTodo] = useState({
    title: "",
  });

  const fetchTodos = async () => {
    const {data} = await axios.get("http://localhost:3001/todos");
    setTodos(data)
  }

  useEffect(() => {
    fetchTodos();
  }, [todo]);

  const onSubmitHandler = (todo) => {
    axios.post("http://localhost:3001/todos", todo);
  };

  const onClickDeleteButtonHandler = (todoId) => {
    axios.delete(`http://localhost:3001/todos/${todoId}`);
  };

  const onClickEditButtonHandler = (todoId, edit) => {
    axios.patch(`http://localhost:3001/todos/${todoId}`, edit);
  };


  console.log(todos)

  return (
    <>
      <form
        onSubmit={(e) => {
					// 👇 submit했을 때 브라우저의 새로고침을 방지합니다. 
          e.preventDefault();
          onSubmitHandler(todo);
        }}
      >
        <div>
          <input
            type="text"
            placeholder="수정하고싶은 Todo ID"
            onChange={(ev) => {
              setTargetId(ev.target.value);
            }}
          />
          <input
            type="text"
            placeholder="수정값 입력"
            onChange={(ev) => {
              setEditTodo({
                ...editTodo,
                title: ev.target.value,
              });
            }}
          />
          <button
            type="button"
            onClick={() => onClickEditButtonHandler(targetId, editTodo)}
          >
            수정하기
          </button>
        </div>
        <input
          type="text"
          onChange={(ev) => {
            const { value } = ev.target;
            setTodo({
              ...todo,
              title: value,
            });
          }}
        />
        <button>추가하기</button>
      </form>
      <div>
        {todos?.map((todo) => (
          <div key={todo.id}> {todo.id} :{todo.title}
          
          <button
              type="button"
              onClick={() => onClickDeleteButtonHandler(todo.id)}>
              삭제하기
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;