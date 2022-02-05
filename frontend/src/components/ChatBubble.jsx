function ChatBubble(props) {

    const getClassNames = () => {
        let classNames = "chat-bubble"

        if (props.first === true) {
            classNames += " first"
        } else if (props.last === true) {
            classNames += " last"
        }

        if (props.sent === true) {
            classNames += " sent"
        } else {
            classNames += " recieved"
        }

        return classNames
    }

    return (
        <div className={getClassNames()}>{props.text}</div>
    )
}

export default ChatBubble