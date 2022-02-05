import Chip from './Chip';

function Card(props) {
    return (
        <div className="tutor-card">
            <h2>{props.name}</h2>
            <Chip active={true} text={props.course} />
        </div>
    )
}

export default Card