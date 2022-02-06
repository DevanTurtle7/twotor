import '../style/HomePage.css'
import Card from '../components/Card'
import axios from 'axios';
import { useEffect, useState } from 'react';

function HomePage(props) {
    const [firstName, setFirstName] = useState('User');
    const [queue, setQueue] = useState([]);
    const [needHelp, setNeedHelp] = useState([])

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


    console.log(needHelp)
    console.log(queue)
    return (
        <div id="home-page">
            <h1 id="welcome-header">Welcome Back, {firstName}.</h1>

            <h2>Help a Student</h2>
            <div className='cards-row'>
                {createCards()}
            </div>
        </div>
    )
}

export default HomePage