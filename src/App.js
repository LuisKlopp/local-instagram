import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Main from "./components/Main"
import Post from "./components/Post"
import Detail from "./components/Detail"
import Update from "./components/Update"
import { Routes, Route, Link, Redirect } from 'react-router-dom'


const App = () => {


  return (
    <>
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/detail/:id" element={<Detail/>}/>
      <Route path="/post" element={<Post/>}/>
      <Route path="/update/:id" element={<Update/>}/>
    </Routes>
    </>
  );
};

export default App;
