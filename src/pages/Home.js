import UserContext from '../context/UserContext';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function Home(){
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    return (
    <>
        <div className="d-flex mt-5 flex-column justify-content-center align-items-center">
             <div className="p-3">
                <h1>Welcome to Zuitt Workouts</h1> 
                <p> Your Workout Tracker</p>

                {(user.id !== null)?
                <Button onClick={() => navigate('/workouts')}> Add Workout</Button>
                :
                <a href="/login">Login to get started</a>}

             </div>
             
        </div>
    </>
    )
}