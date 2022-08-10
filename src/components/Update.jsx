import React, { useEffect, useState, useReducer, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { __addNumber, __getTodos } from "../store";
import { Routes, Route, Link, useNavigate, Outlet, useParams } from "react-router-dom";
import axios from "axios";

const reducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

const Update = () => {
  const { isLoading, error, todos } = useSelector((state) => state.todos);
  const navigate = useNavigate();
  const logoImgInput = useRef();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [fileImage, setFileImage] = useState("");
  const [state, setState] = useReducer(reducer, {
    title: "",
    content: "",
  });

  useEffect(() => {
    dispatch(__getTodos());
  }, [])

  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
    
  };

  const { title, content } = state;

  const onChange = (e) => {
    setState(e.target);
  };

  const onSubmitHandler = (title, content, fileImage) => {
    const obj = {
      title: title,
      content: content,
      url: fileImage,
    };
    axios.post("http://localhost:3001/todos", obj);
  };

  const update_todo = todos.find((data) =>  data.id === Number(id))


  if(todos.length === 0) {
    return (
      <StWrapper>
        <h1>로딩중!</h1>
      </StWrapper>
    ) 
  } else{

  return (
    <>
      <GlobalStyle />
      <StHeader>
        <StSpan
          onClick={() => {
            navigate("/");
          }}
          style={{ cursor: "pointer" }}
        >
          Logo
        </StSpan>
      </StHeader>
      <StPostList>
        <StImgBox alt="이미지 업로드하세요~" src={fileImage} style={{ margin: "auto" }} />
        <StDiv>
          <StSpan>Title</StSpan>
          <StInput
            name="title"
            onChange={onChange}
            value={update_todo.title}
          ></StInput>
          <StSpan style={{ marginTop: "50px" }}>Content</StSpan>
          <StTextarea
            name="content"
            onChange={onChange}
            value={update_todo.content}
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
                onSubmitHandler(title, content, fileImage);
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
}
export default Update;

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
  border: 2px solid black;
  display: flex;
  align-items: center;
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

const StWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  `;