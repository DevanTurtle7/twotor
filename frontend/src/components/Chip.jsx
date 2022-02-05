function Chip(props) {
    return (
        <div className="chip clickable">
            <p className="chip-text">{props.text}</p>
        </div>
    );
}

export default Chip;