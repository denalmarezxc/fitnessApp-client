import { Form, Button } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

import {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom'; 

export default function Register(){
    const {user} = useContext(UserContext);
    const notyf = new Notyf();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isActive, setIsActive] = useState(false);

    useEffect(()=> {
		
		if(email !== "" && password === confirmPassword  ){
			setIsActive(true);
		}else{
			setIsActive(false);
		}
		

	}, [email, password, confirmPassword])

    const registerUser = (event) => {
		// to prevent the page from refreshing during submission
		event.preventDefault();


		// this will send a request to register a user in our API

		fetch('https://fitnessapp-api-ln8u.onrender.com/users/register', {
			method: 'POST',
			headers: {
				"Content-Type" : 'application/json'
			},
			body: JSON.stringify({
				
				email,
				password
			})
		})
		.then(response => response.json())
		.then(data => {
			// console.log(data)
			if(data.message === 'Registered Successfully'){
				
				setEmail('');
				setPassword('');
				setConfirmPassword('');

				notyf.success("Registration successful!");
                navigate('/login');
			}else {
				notyf.error("Something went wrong!");
			}
			
		})

	}


    return (
    <Form className='mt-5' onSubmit = {event => registerUser(event)}>
        <h1 className='text-center'>REGISTER</h1>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" 
        value = {email}
        onChange = {event => setEmail(event.target.value)}
        required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="enter your password"
        value = {password}
        onChange = {event => setPassword(event.target.value)}
        required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="confirm your password" 
        value = {confirmPassword}
        onChange = {event => setConfirmPassword(event.target.value)}
        required/>
      </Form.Group>
      {
		      	isActive ?
		      		<Button variant="primary" type="submit" >
		      		  Register
		      		</Button>
		      	:
		      		<Button variant="danger" type="submit" disabled>
		        		Register
		      		</Button>
		      }
    </Form>
    )
}