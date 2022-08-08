import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { createGlobalStyle } from 'styled-components'
import { useParams } from "react-router-dom";
import { __getTodos } from "../store";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios"




const Detail = ({todo}) => {

  const { id } = useParams();
  const [todos, setTodos] = useState([])

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getTodos());
    fetchTodos()
  }, []);
  
  
  const fetchTodos = async () => {
    const {data} = await axios.get("http://localhost:3001/todos");
    setTodos(data); 
  };

  let todo_detail = todos.find(data => data.id === Number(id));

  console.log(todos)

  return (
    <>
      <GlobalStyle/>
      <StWrapper>
        <StItem>
          {/* <h3>id : {todo_detail.id}</h3> */}
          {/* <Stbutton onClick={() => {navigate("/")}} style={{cursor:"pointer"}}>메인으로</Stbutton> */}
          {/* <h1>{todo_detail.title}</h1> */}
          {/* <h3>{todo_detail.content}</h3> */}
        </StItem>
      </StWrapper>
    </>
  );
};

export default Detail;


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;  
  }

	body {
		padding: 0;
		margin: 0;
    background-color: ecdede; 
	}
  html {
    height:100%;
  }
  `;

const StWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StItem = styled.div`
  width: 30%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  border: 3px solid ${props => props.isDone ? '#12a670' : '#ea5718'};
  justify-content: center;
  align-items: center;
`;

const Stbutton = styled.div`
  width:30%;
  background-color: antiquewhite;
  padding:20px;
  margin: 0px 0px 50px 0px;
  text-align: center;
  font-weight: 600;
  font-size:20px;
  &:hover{  
    background-color : #f2ae81;
  }
`