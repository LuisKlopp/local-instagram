import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components"
import { createGlobalStyle } from 'styled-components'
import Card from "./Card"
import { addNumber, minusNumber, __addNumber, __getTodos } from "../store";





const Main = () => {


  const { isLoading, error, todos } = useSelector((state) => state.todos);
  const globalNumber = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  return (
    <>
    <GlobalStyle/>
    <StHeader>
      <StSpan>Logo</StSpan>

      <StSpan>Post</StSpan>

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

const StSpan = styled.span`
  font-size:20px;
  font-weight: 600;
  padding: 0px 50px 0px 50px;
`

const StMainList = styled.div`
  width:70%;
  margin:0 auto;
  height:88vh;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`