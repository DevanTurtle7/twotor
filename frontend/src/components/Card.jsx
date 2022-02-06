import Chip from './Chip';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Card(props) {
    const navigate = useNavigate()

    const getCookie = (cname) => {
        // Code from w3 schools :)
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }

    const onClick = async () => {
        fetch('http://ndawson.student.rit.edu/leaveQueue', {
            method: "POST",
            headers: {
                'Authorization': getCookie('cookie'),
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                'course_id': props.course_id
            })
        }).then(response => response.json()).then(response => {
            console.log(response)
        })


        fetch('http://ndawson.student.rit.edu/joinChat', {
            method: "POST",
            headers: {
                'Authorization': getCookie('cookie'),
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                'receiver': props.userId
            })
        }).then(response => response.json()).then(response => {
            navigate('/chat')
        })
    }

    console.log(props)

    return (
        <div className="tutor-card">
            <h2>{props.name}</h2>
            <Chip text={props.course} active={true} onClick={()=>{}}/>
            <p>{props.description}</p>
            <div className='tutor-card-footer'>
                <button onClick={onClick} className='button-primary'>Tutor</button>
            </div>
        </div>
    )
}

export default Card