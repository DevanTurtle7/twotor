import Chip from './Chip';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Card(props) {
    const navigate = useNavigate()

    const onClick = async () => {
        fetch('http://ndawson.student.rit.edu/leaveQueue', {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
                "Access-Control-Max-Age": 2592000, // 30 days
            }, body: JSON.stringify({
                'course_id': props.course_id
            })
        }).then(response => response.json()).then(response => {
            console.log(response)
        })

        fetch('http://ndawson.student.rit.edu/joinChat', {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
                "Access-Control-Max-Age": 2592000, // 30 days
            }, body: JSON.stringify({
                'receiver': props.id
            })
        }).then(response => response.json()).then(response => {
            console.log(response)
        })
    }

    return (
        <div className="tutor-card">
            <h2>{props.name}</h2>
            <button onClick={onClick}>Tutor</button>
        </div>
    )
}

export default Card