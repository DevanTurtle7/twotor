import SetupPage from './pages/SetupPage';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import { HashRouter as Router, Routes, Route, IndexRedirect } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';
import LoginVerifyWrapper from './components/LoginVerifyWrapper';
import LogoutPage from './pages/LogoutPage';

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
                <Route exact path='/createAccount' element={<LoginVerifyWrapper reverse><SetupPage universities={universities} /></LoginVerifyWrapper>} />
                <Route exact path='/chat' element={<LoginVerifyWrapper><ChatPage/></LoginVerifyWrapper>} />
                <Route exact path='/home' element={<LoginVerifyWrapper><HomePage/></LoginVerifyWrapper>} />
                <Route exact path='/login' element={<LoginPage/>} />
                <Route exact path='/logout' element={<LogoutPage/>} />
            </Routes>
        </Router>
    );
}

export default App;
