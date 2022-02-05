import { Button } from 'reactstrap';
import SetupPage from './pages/SetupPage';
import WelcomePage from './pages/WelcomePage'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    const getUniversities = () => {
        return {
            1: "Rochester Institute of Technology",
            2: "University of Rochester"
        }
    }

    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<WelcomePage />} />
                <Route exact path='/createAccount' element={<SetupPage universities={getUniversities()} />} />
            </Routes>
        </Router>
    );
}

export default App;
