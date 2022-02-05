function ChatBubble(props) {

    const getClassNames = () => {
        let classNames = "chat-bubble"

        if (props.first === true) {
            classNames += " first"
        }

        if (props.last === true) {
            classNames += " last"
        }

        if (props.sent === true) {
            classNames += " sent"
        } else {
            classNames += " recieved"
        }

        return classNames
    }

    const getRowClassNames = () => {
        let classNames = 'bubble-row'

        if (props.sent === true) {
            classNames += " right"
        } else {
            classNames += " left"
        }

        return classNames
    }

    return (
        <div className={getRowClassNames()}>
            <div className={getClassNames()}>
                <p>{props.text}</p>
            </div>
        </div>
    )
}

export default ChatBubble