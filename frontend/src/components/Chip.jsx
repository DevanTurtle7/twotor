import { IoIosCloseCircle } from 'react-icons/io';

function Chip(props) {
    const onClick = () => {
        let canDelete = props.canDelete === true

        if (!canDelete) {
            props.onClick(props.data)
        }
    }

    const getClassNames = () => {
        let classNames = 'chip'
        let active = props.active
        let canDelete = props.canDelete === true

        if (!canDelete) {
            classNames += " clickable"
        }

        if (active) {
            classNames += ' chip-active'
        }

        return classNames
    }

    const onDelete = () => {
        console.log('joaisj')
        if (props.onDelete !== undefined) {
            props.onDelete(props.data)
        }
    }

    const getDeleteIcon = () => {
        let canDelete = props.canDelete === true

        if (canDelete) {
            return (<IoIosCloseCircle className="chip-delete-icon clickable" onClick={onDelete} />)
        } else {
            return null
        }
    }

    return (
        <div className={getClassNames()} onClick={onClick}>
            {getDeleteIcon()}
            <p className="chip-text">{props.text}</p>
        </div>
    );
}

export default Chip;