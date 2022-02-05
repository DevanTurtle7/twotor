import Chip from './Chip';
import { Link } from "react-router-dom";

function Card(props) {
    return (
        <div className="tutor-card">
            <h2>{props.name}</h2>
            <Link to="/chat"><button>Tutor</button></Link>
        </div>
    )
}

export default Card