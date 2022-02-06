import Chip from './Chip';
import { useNavigate } from 'react-router-dom';

function Card(props) {
    const navigate = useNavigate()
    const onClick = async() => {
    await axios.post('http://ndawson.student.rit.edu/leaveQueue', {
        'course_id': props.course_id
        })
    await axios.post('http://ndawson.student.rit.edu/joinChat', {
        'receiver': props.id}).then(res => {
            navigate("/chat")
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