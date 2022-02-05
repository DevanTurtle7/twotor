import { Button } from 'reactstrap';
import SetupPage from './pages/SetupPage';
import WelcomePage from './pages/WelcomePage'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
    const [universities, setUniversities] = useState({})

    const getUniversities = async () => {
        await axios.get('http://ndawson.student.rit.edu/universities').then(res => {
            setUniversities(res.data)
        });
    }

    useEffect(() => {
        getUniversities()
    }, [])

    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<WelcomePage />} />
                <Route exact path='/createAccount' element={<SetupPage universities={universities} />} />
            </Routes>
        </Router>
    );
}

export default App;
