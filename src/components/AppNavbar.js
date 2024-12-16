import {NavLink } from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import { useState, useContext } from 'react';
import UserContext from '../context/UserContext';

export default function AppNavBar(){
  const {user} = useContext(UserContext);
    return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        
          <Navbar.Brand className="ps-5" href="#home">WorkOuts</Navbar.Brand>
          <Nav className="ms-auto pe-5">
            <Nav.Link as={NavLink} to="/" exact="true" >Home</Nav.Link>
            {(user.id !== null)?
		            		
                <>
                  <Nav.Link as = {NavLink} to = '/workouts'>Workouts</Nav.Link>
                  <Nav.Link as = {NavLink} to = '/addWorkout'>Add Workout</Nav.Link>
                  <Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
                </>
		            :
		            <>
		            	<Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
		            	<Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
		            </>
		        	}
          </Nav>
        
      </Navbar>
    </>
    )
}