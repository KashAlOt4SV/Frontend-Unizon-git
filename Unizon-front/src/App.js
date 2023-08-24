import {Routes, Route} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Container from "@mui/material/Container";


import { SideBar } from "./components";
import { Home, FullPost, Registration, AddPost, Login, FiltHome, NewProject, UserPage, EditProfile, Friends, Messages, MyProject, Projects, Vacancy } from "./pages";
import React  from "react";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";


function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth)

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [])

  return (
    <>
      <SideBar/>
      <Container maxWidth="lg">
        <Routes>
          <Route path='/' element = {<Home />}/>
          <Route path='/tag/:name' element = {<FiltHome />}/>
          <Route path='/newProject' element = {<NewProject />}/>
          <Route path='/posts/:id' element = {<FullPost />}/>
          <Route path='/posts/:id/edit' element = {<AddPost />}/>
          <Route path='/posts/:id/' element = {<FullPost />}/>
          <Route path='/add-post' element = {<AddPost />}/>
          <Route path='/user-page/:id' element = {<UserPage />}/>
          <Route path='/edit-profile/:id' element = {<EditProfile />}/>
          <Route path='/login' element = {<Login />}/>
          <Route path='/register' element = {<Registration />}/>
          <Route path='/friens' element = {<Friends />}/>
          <Route path='/messages' element = {<Messages />}/>
          <Route path='/myProject' element = {<MyProject />}/>
          <Route path='/projects' element = {<Projects />}/>
          <Route path='/vacancy' element = {<Vacancy />}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
