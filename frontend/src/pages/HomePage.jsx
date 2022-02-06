import '../style/HomePage.css'
import Card from '../components/Card'
import axios from 'axios';
import { useState } from 'react';

const data = [
    {
        name: "Nick",
        course: "SWEN-250"
    },
    {
        name: "Nick",
        course: "SWEN-250"
    },
    {
        name: "Nick",
        course: "SWEN-250"
    },
    {
        name: "Nick",
        course: "SWEN-250"
    },
]

function HomePage(props) {
    const [firstName, setFirstName] = useState('User');
    axios.get('http://ndawson.student.rit.edu/getname').then(res => {
        console.log(res.data);
        setFirstName(res.data);
    })

    const createCards = () => {
        const cards = []
        console.log(data)

        for (let i = 0; i < data.length; i++) {
            let current = data[i]
            let name = current.name
            let course = current.course

            cards.push(<Card
                name={name}
                course={course}
                key={name + i}
            />)
        }

        return cards
    }
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