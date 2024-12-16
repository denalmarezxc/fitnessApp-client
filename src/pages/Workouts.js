import UserContext from '../context/UserContext';
import {useState, useEffect, useContext} from 'react';
import { Navigate, useNavigate , Link} from 'react-router-dom';

import {Container, Row, Col, Card, Button} from 'react-bootstrap';


export default function Workouts(){
    const {user} = useContext(UserContext);
    const navigate = useNavigate(); 
    // console.log(user);
    const [workouts, setWorkouts] = useState([]);
    

    const fetchData = () => {
        let fetchUrl = "https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts";

        fetch(fetchUrl, {
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            
            console.log(data.workouts);
            setWorkouts(data.workouts);

        });
    }

    useEffect(() => {
        fetchData();

    }, []);


    

    return (
        <>
            

            {(user.id !== null)?
                <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                    <h1>Workouts</h1>
                    <button onClick={() => navigate('/addWorkout')} className="btn btn-primary">
                    Add Workout
                    </button>
                </div>
                :
                <Navigate to='/workouts'/>
            }

            <div className="container mt-2 d-flex flex-column justify-content-center align-items-center">
                
                <Row>
                    {workouts.length > 0 ? 
                    
                    ( workouts.map((workout, index) => (
                       
                        <Col key={index} sm={12} md={6} lg={4}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title>{workout.name}</Card.Title>
                                    <Card.Text>Duration: {workout.duration} minutes</Card.Text>
                                    <Card.Text>Date Added: {new Date(workout.dateAdded).toISOString().split('T')[0]} </Card.Text>
                                    <Card.Text>Status: {workout.status} </Card.Text>
                                    <Link className="btn btn-primary d-block" to = {`/workouts/${workout._id}`}>edit</Link>
                                    {/* <Button>edit</Button> */}
                                </Card.Body>
                                
                            </Card>
                            
                        </Col>
                    ))) 
                    : 
                    (
                    <p>No workouts found</p>
                    )}
                </Row>
            </div>

        </>
    )
}