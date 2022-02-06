import '../style/HomePage.css'
import Card from '../components/Card'
import Chip from '../components/Chip';
import { Fragment, useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomePage(props) {
    const [firstName, setFirstName] = useState('User');
    const [queue, setQueue] = useState([]);
    const [needHelp, setNeedHelp] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [currentCourse, setCurrentCourse] = useState("")
    const [currentCourseId, setCurrentCourseId] = useState(-1)
    const [problem, setProblem] = useState("")
    const navigate = useNavigate()

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

    const getFirstName = () => {
        fetch('http://ndawson.student.rit.edu/getname', {
            method: "GET",
            headers: {
                'Authorization': getCookie('cookie'),
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(response => {
            setFirstName(response)
        })
    }

    const createCards = () => {
        const cards = []

        for (let i = 0; i < queue.length; i++) {
            let current = queue[i]
            let firstName = current.first_name
            let lastName = current.last_name
            let name = firstName + " " + lastName
            let description = current.description
            let courseName = current.courseName
            let course = current.course
            let userId = current.user_id

            cards.push(<Card
                name={name}
                course={courseName}
                userId={userId}
                key={name + i}
            />)
        }

        return cards
    }

    useEffect(() => {
        fetch('http://ndawson.student.rit.edu/queue', {
            method: "GET",
            headers: {
                'Authorization': getCookie('cookie'),
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(response => {
            setQueue(response)
        })

        fetch('http://ndawson.student.rit.edu/listNeedHelp', {
            method: "GET",
            headers: {
                'Authorization': getCookie('cookie'),
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(response => {
            setNeedHelp(response)
        })
    }, [])

    const joinQueue = async (id, description) => {
        fetch('http://ndawson.student.rit.edu/joinQueue', {
            method: "POST",
            headers: {
                'Authorization': getCookie('cookie'),
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                'course_id': id,
                description: description
            })
        }).then(response => response.json()).then(response => {
            console.log(response)
        })
    }

    const openModal = (id, courseName) => {
        setCurrentCourse(courseName)
        setCurrentCourseId(id)
        setModalOpen(true)
    }

    const createHelpChips = () => {
        const chips = []

        for (let i = 0; i < needHelp.length; i++) {
            let current = needHelp[i]
            let courseName = current.code
            let id = current.id

            chips.push(<Chip
                text={courseName}
                onClick={() => { openModal(id, courseName) }}
                active={true}
                key={courseName}
            />)
        }

        return chips
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }

    const updateProblemText = (e) => {
        setProblem(e.target.value)
    }

    const onClick = () => {
        joinQueue(currentCourseId, problem)
        navigate('/chat')
    }

    return (
        <Fragment>
            <div id="home-page">
                <h1 id="welcome-header">Welcome Back, {firstName}.</h1>

                <h2>Help a Student</h2>
                <div className='cards-row'>
                    {createCards()}
                </div>
                <div>
                    <h2>Ask for Help</h2>
                    <div className='help-chips-row'>
                        {createHelpChips()}
                    </div>
                </div>
            </div>

            <Modal isOpen={modalOpen}>
                <ModalHeader toggle={toggleModal}>
                    Ask for Help in {currentCourse}
                </ModalHeader>
                <ModalBody>
                    <Input type="textarea" placeholder='Describe your problem...' onChange={updateProblemText}></Input>
                </ModalBody>
                <ModalFooter>
                    <div className='modal-footer-row'>
                        <button className='button-secondary'>Cancel</button>
                        <button className='button-primary' disabled={problem === ""} onClick={onClick}>Join Queue</button>
                    </div>
                </ModalFooter>
            </Modal>
        </Fragment>
    )
}

export default HomePage