import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNumber, minusNumber, __addNumber, __getTodos } from "../store";
import { useEffect } from "react";
import styled from "styled-components"




const Card = ({todo}) => {
  
  
  const { isLoading, error, todos } = useSelector((state) => state.todos);
  console.log(todos)

  return (
    <>

    <StCard>
      <StCardHeader>
      <StSpan>{todo.title}</StSpan>
      <StButton style={{backgroundColor:"red"}}></StButton>
      <StButton></StButton>
      </StCardHeader>
      <StImg todoc={todo.url}>

      </StImg>
    </StCard>

    </>
  );
};



export default Card;


const StCard = styled.div`
  width:400px;
  height:300px;
  margin-top:70px;
  background-color: #dfdfdf;
  display: flex;
  justify-content: center;
  box-shadow: 1px 1px 5px 0px;
  position:relative;
`

const StSpan = styled.span`
  font-weight:600;
  font-size:20px;
  margin-left:20px;
`

const StCardHeader = styled.div`
  width:100%;
  height:20%;
  background-color: #cacaca;
  /* display: flex; */
  justify-content: space-between;
  align-items: center;
`

const StButton = styled.button`
  background: none;
  width:20px;
  border-radius: 30px;
  height:20px;
  cursor: pointer;
  float:right;
  border:none;
  background-color: #3fe23f;
  margin:5px 5px 0px 5px;
`

const StImg = styled.div`
  position:absolute;
  width:100%;
  height:89%;
  bottom:1px;
  background-image: url(${props => props.todoc});
	background-repeat: no-repeat;
	background-size: cover;
`