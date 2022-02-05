import { useState } from "react";

function Chip(props) {
    const onClick = () => {
        props.onClick(props.text)
    }

    const getClassNames = () => {
        let classNames = 'chip clickable'
        let active = props.active

        if (active) {
            classNames += ' chip-active'
        }

        return classNames
    }

    return (
        <div className={getClassNames()} onClick={onClick}>
            <p className="chip-text">{props.text}</p>
        </div>
    );
}

export default Chip;