import '../style/HomePage.css'
import Card from '../components/Card'

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
            <h1 id="welcome-header">Welcome Back, Devan.</h1>

            <h2>Help a Student</h2>
            <div className='cards-row'>
            {createCards()}
            </div>
        </div>
    )
}

export default HomePage