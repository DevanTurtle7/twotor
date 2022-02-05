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

    return (
        <div className={getClassNames()}>
            <p>{props.text}</p>
        </div>
    )
}

export default ChatBubble