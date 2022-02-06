import '../style/ChatPage.css'
import { Input } from 'reactstrap';
import { MdSend, MdArrowBack } from "react-icons/md";
import ChatBubble from '../components/ChatBubble'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        }, {
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
        {
            sender: 0,
            message: "ashjdkaj kdjaklsjdkl jaslkdj lkasjlkd jaklsdjlkasjlk djalkj sdlkaslkjdlkaj sldk "
        }, {
            sender: 0,
            message: "asdhj jkasjlkasdlkjas dlalklkl lj ljfd ljd jldjlkdjldfklj gdljflkjdflk dlkj ldkdlk j"
        }, {
            sender: 0,
            message: "asldjias jdlalid jlaksj ldjalkj dlkjaslk d"
        }, {
            sender: 0,
            message: "ashjdkaj kdjaklsjdkl jaslkdj lkasjlkd jaklsdjlkasjlk djalkj sdlkaslkjdlkaj sldk "
        }, {
            sender: 0,
            message: "asdhj jkasjlkasdlkjas dlalklkl lj ljfd ljd jldjlkdjldfklj gdljflkjdflk dlkj ldkdlk j"
        }, {
            sender: 0,
            message: "asldjias jdlalid jlaksj ldjalkj dlkjaslk d"
        },
    ]

    const [text, setText] = useState("")
    const navigate = useNavigate();

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

    const textChanged = (e) => {
        setText(e.target.value)
        console.log(e.target.value)
    }

    const sendMessage = () => {

    }

    const goBack = () => {
        navigate("/home")
    }

    return (
        <div id="chat-page">
            <div id="navbar">
                <h3 className='message-label'>
                    <MdArrowBack className='back-arrow clickable' onClick={goBack} /> Nick Dawson
                </h3>
            </div>
            <div id="chat-history">
                {createChatBubbles()}
            </div>
            <div id="message-bar">
                <div id="input-container">
                    <Input placeholder='Send Message' type='text' id='message-input' onChange={textChanged} />
                </div>
                <div id="button-container">
                    <button className='circle-button' onClick={sendMessage}>
                        <MdSend />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatPage;