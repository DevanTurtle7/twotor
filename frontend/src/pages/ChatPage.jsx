import '../style/ChatPage.css'
import { Input } from 'reactstrap';
import { MdSend } from "react-icons/md";
import ChatBubble from '../components/ChatBubble'

function ChatPage(props) {
    const messages = [
        {
            sender: 1,
            message: "ajdlkasjldkajs laksjdlka sjlkjdlka jlkdjaslkjkals jdlk ajklj lkasj lkasjlkas jlk asjlkd jlkasj lksjlas lkajlksjlka jl jl"
        },
        {
            sender: 1,
            message: "hello"
        },
        {
            sender: 1,
            message: "hello"
        },
        {
            sender: 0,
            message: "hello"
        },
        {
            sender: 1,
            message: "hello"
        },
    ]

    const createChatBubbles = () => {
        const bubbles = []
        let numMessages = messages.length

        for (var i = numMessages - 1; i >= 0; i--) {
            let message = messages[i]
            let sender = message.sender
            let sent = sender === 1
            let text = message.message
            let first = i === (numMessages - 1) || messages[i + 1].sender !== sender
            let last = i === 0 || messages[i - 1].sender !== sender

            // Add a new bubble
            bubbles.push(<ChatBubble
                sent={sent}
                text={text}
                first={first}
                last={last}
                key={i}
            />)
        }

        return bubbles
    }

    return (
        <div id="chat-page">
            <div id="chat-history">
                {createChatBubbles()}
            </div>
            <div id="message-bar">
                <div id="input-container">
                    <Input placeholder='Send Message' type='text' id='message-input' />
                </div>
                <div id="button-container">
                    <button className='circle-button'>
                        <MdSend />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatPage;