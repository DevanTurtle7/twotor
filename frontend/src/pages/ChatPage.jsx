import '../style/ChatPage.css'
import { Input } from 'reactstrap';
import { MdSend, MdArrowBack } from "react-icons/md";
import ChatBubble from '../components/ChatBubble'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ChatPage(props) {
    const [messages, setMessages] = useState([])
    const [uid, setUID] = useState(-1)
    const [gettingChats, setGettingChats] = useState(false)
    const [name, setName] = useState("")

    const getCookie = (cname) => {
        // Code from w3 schools :)
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }

    const [text, setText] = useState("")
    const navigate = useNavigate();

    const createChatBubbles = () => {
        console.log(messages)
        const bubbles = []
        let numMessages = messages.length

        for (var i = numMessages - 1; i >= 0; i--) {
            let message = messages[i]
            let sender = message.sender_id
            let sent = sender === uid
            let text = message.message
            let first = i === (numMessages - 1) || messages[i + 1].sender_id !== sender
            let last = i === 0 || messages[i - 1].sender_id !== sender

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
    }

    const sendMessage = async () => {
        fetch('http://ndawson.student.rit.edu/createChat', {
            method: "POST",
            headers: {
                'Authorization': getCookie('cookie'),
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                'message-input': text
            })
        }).then(response => response.json()).then(response => {
        })
    }

    const goBack = async () => {
        fetch('http://ndawson.student.rit.edu/leaveChat', {
            method: "POST",
            headers: {
                'Authorization': getCookie('cookie'),
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
            })
        }).then(response => response.json()).then(response => {
            navigate('/home')
        })
    }

    const getChats = async () => {
        fetch('http://ndawson.student.rit.edu/chatList', {
            method: "POST",
            headers: {
                'Authorization': getCookie('cookie'),
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
            })
        }).then(response => response.json()).then(async (response) => {
            setMessages(response)
            await sleep(1000)
            getChats()
        })
    }

    const getUid = () => {
        return new Promise((resolve) => {
            fetch('http://ndawson.student.rit.edu/getid', {
                method: "GET",
                headers: {
                    'Authorization': getCookie('cookie'),
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json()).then(response => {
                resolve(response['id'][0])
            })
        })
    }

    const getName = () => {
        return new Promise((resolve) => {
            fetch('http://ndawson.student.rit.edu/getChattingWith', {
                method: "GET",
                headers: {
                    'Authorization': getCookie('cookie'),
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json()).then(response => {
                console.log(response)
                setName(response.first_name + " " + response.last_name)
            })
        })
    }

    const onKeyPress = (e) => {
        if (e.charCode === 13) {
            sendMessage()
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(async () => {
        if (uid === -1) {
            let uid = await getUid()
            console.log(uid)
            setUID(uid)
        } else if (!gettingChats) {
            getName()
            setGettingChats(true)
            getChats()
        }
    })

    console.log('rendering')

    return (
        <div id="chat-page">
            <div id="navbar">
                <h3 className='message-label'>
                    <MdArrowBack className='back-arrow clickable' onClick={goBack} />
                    {name}
                </h3>
            </div>
            <div id="chat-history">
                {createChatBubbles()}
            </div>
            <div id="message-bar">
                <div id="input-container">
                    <Input placeholder='Send Message' type='text' id='message-input' onKeyPress={onKeyPress} onChange={textChanged} />
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