import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { createGlobalStyle } from 'styled-components'
import Card from "./Card"
import { __addNumber, __getTodos } from "../store";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios"




const Main = () => {


  const { isLoading, error, todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [todo_arr, setTodos] = useState([]);



  useEffect(() => {
    dispatch(__getTodos());
    fetchTodos();
    console.log(todos)
  }, [dispatch]);

  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:3001/todos");
    setTodos( data );
  };

  return (
    <>
    <GlobalStyle/>
    <StHeader>
      <StButton onClick={() => {navigate("/")}}>Logo</StButton>
      <StButton onClick={() => {navigate("/post")}}>Post</StButton>
    </StHeader>
    <StMainList>
    {todos.map((todo) => (
          <Card todo={todo} key={todo.id}/>
        ))}
    </StMainList>
    </>
  );
};

export default Main;


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;  
  }

  body {
    box-sizing: border-box;
    height:100%;
  }

  html {
    height:100%;
  }
`

const StHeader = styled.div`
  width:100%;
  height:8vh;
  border:2px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

`

const StButton = styled.button`
  font-size:20px;
  font-weight: 600;
  padding: 0px 30px 0px 30px;
  background-color: white;
  width:10%;
  border:none;
  cursor: pointer;
`

const StMainList = styled.div`
  width:70%;
  margin:0 auto;
  height:88vh;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`