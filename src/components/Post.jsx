import React, { useEffect, useState, useReducer, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { __getTodos, addList } from "../store";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import main_logo from "../img/logo.png"

const reducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

const Post = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoImgInput = useRef();

  const [fileImage, setFileImage] = useState("");
  const [state, setState] = useReducer(reducer, {
    title: "",
    content: "",
  });
  const onCreate = () => {
    const newList = {
      title,
      content,
      url:fileImage
    };
    dispatch(addList(newList))
  };

  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
  };

  const { title, content } = state;

  const onChange = (e) => {
    setState(e.target);
  };

  return (
    <>
      <GlobalStyle />
      <StHeader>
      <img src={main_logo} style={{marginLeft:"20px"}} onClick={() => {navigate("/")}}></img>
      <Btn onClick={() => {navigate("/post")}}>Post</Btn>
      </StHeader>
      <StPostList>
        <StImgBox alt="이미지 업로드하세요~" src={fileImage} style={{ margin: "auto" }} />
        <StDiv>
          <StSpan>Title</StSpan>
          <StInput
            placeholder="타이틀을 입력하세요"
            name="title"
            onChange={onChange}
          ></StInput>
          <StSpan style={{ marginTop: "50px" }}>Content</StSpan>
          <StTextarea
            placeholder="내용을 입력하세요"
            name="content"
            onChange={onChange}
          ></StTextarea>
        </StDiv>

        <StButtonDiv>
          <StButton
            onClick={() => {
              logoImgInput.current.click();
            }}
          >
            이미지 첨부하기
          </StButton>
          <StButton
            onClick={() => {
              if (title !== "" && content !== "") {
                onCreate()
                navigate("/");
              }
            }}
          >
            제출
          </StButton>

          <StImageInput
            type="file"
            accept="image/*"
            name="file"
            ref={logoImgInput}
            onChange={saveFileImage}
          ></StImageInput>
        </StButtonDiv>
      </StPostList>
    </>
  );
};

export default Post;

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
`;

const StHeader = styled.div`
  width: 100%;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StSpan = styled.span`
  font-size: 20px;
  font-weight: 600;
  padding: 0px 50px 0px 50px;
  /* cursor:pointer; */
`;

const StPostList = styled.div`
  width: 70%;
  margin: 0 auto;
  height: 88vh;
  display: flex;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StImgBox = styled.img`
  width: 50%;
  height: 50%;
  border: 1px solid black;
  /* margin:10%; */
`;

const StInput = styled.input`
  width: 70%;
  margin-top: 10px;
  height: 30px;
  padding-left: 10px;
`;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-left: 30px;
`;

const StTextarea = styled.textarea`
  width: 70%;
  margin-top: 30px;
  height: 200px;
  font-size: 17px;
  padding: 10px;
`;

const StButton = styled.button`
  width: 15%;
  /* border:1px solid black; */
  height: 30px;
`;

const StImageInput = styled.input`
  width: 50%;
  height: 30px;
  display: none;
`;

const StButtonDiv = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid black;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-around;
`;

const Btn = styled.label`
    height: 22px;
    padding: 6px 16px;
    background: linear-gradient(180deg, #FFFFFF 0%, #E3E3E3 100%);
    border: 1px solid #D7D7D7;
    border-radius: 4px;
    margin-right: 20px;
    font-weight: 600;
    cursor: pointer;
`;