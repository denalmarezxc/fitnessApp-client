import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavBar from "./components/AppNavbar";
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Logout from './pages/Logout';
import Workouts from './pages/Workouts';
import AddWorkout from './components/AddWorkout';

import { UserProvider } from './context/UserContext';
import {Container} from 'react-bootstrap'


import {useState, useEffect} from 'react';



function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  //function for clearing localstorage on logout
  function unsetUser(){
    localStorage.clear();
  }

  useEffect(()=> {
      //fetch to retrieve the user details
    
    if(localStorage.getItem('token')){
        fetch('https://fitnessapp-api-ln8u.onrender.com/users/details', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data.user._id);

            if(data.user._id === undefined){
              setUser({
                id:null,
                isAdmin: null
              })
            }else{
              setUser({
                id: data.user._id
              })
            }
        })

    }else{
      setUser({
        id: null
      })
      
    }

  }, [])

  return(
    <>
      <UserProvider value = {{user, setUser, unsetUser}}>
        <Router>
          <AppNavBar/>
          <Container>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Registration/>} />
              <Route path="/logout" element={<Logout/>} />  
              <Route path="/workouts" element={<Workouts/>} />  
              <Route path="/addWorkout" element={<AddWorkout/>} /> 
            
            </Routes>
          </Container>
        </Router>
      </UserProvider>
      
    </>
  )
}

export default App;
