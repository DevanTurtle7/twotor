import SetupPage from './pages/SetupPage';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import { HashRouter as Router, Routes, Route, IndexRedirect } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';

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
                <Route path='/' element={<WelcomePage />} />
                <Route exact path='/createAccount' element={<SetupPage universities={universities} />} />
                <Route exact path='/chat' element={<ChatPage/>} />
                <Route exact path='/home' element={<HomePage/>} />
                <Route exact path='/login' element={<LoginPage/>} />
            </Routes>
        </Router>
    );
}

export default App;
