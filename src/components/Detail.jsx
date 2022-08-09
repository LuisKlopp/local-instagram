import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { Routes, Route, Link, useNavigate, Outlet, useParams } from "react-router-dom";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { __addNumber, __getTodos } from "../store";

const Detail = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [todo_arr, setTodos] = useState([]);

  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:3001/todos");
    setTodos( data );
  };

  useEffect(() => {
    fetchTodos();
  }, [])
  // let todos_1 = todo_state.find(data => data.id === Number(id));
  let todos_1 = todo_arr.find(data => data.id === Number(id));
  
  if (todo_arr.length !== 0) {
    console.log(todo_arr)
  return (
    <>
      <GlobalStyle />
      <StWrapper>
        <StItem>
          <h1>{todos_1.title}</h1>
          <h1>{todos_1.content}</h1>
          <Stbutton
            onClick={() => {navigate("/")
            }}style={{ cursor: "pointer" }}>
            메인으로
          </Stbutton>
        </StItem>
      </StWrapper>
    </>
  );
          }
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
  justify-content: center;
  align-items: center;
  border:3px solid orange;
`;

const Stbutton = styled.div`
  width: 30%;
  background-color: antiquewhite;
  padding: 20px;
  margin: 0px 0px 50px 0px;
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  &:hover {
    background-color: #f2ae81;
  }
`;
