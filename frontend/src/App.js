import { Button } from 'reactstrap';
import SetupPage from './pages/SetupPage';



function App() {
    const getSubjects = () => {
        return {
            "SWEN": ["123", "124", "101", "250", "344"],
            "GCIS": ["123", "124", "101", "250", "344"],
            "MATH": ["123", "124", "101", "250", "344"],
            "ISTE": ["123", "124", "101", "250", "344"],
            "STSO": ["123", "124", "101", "250", "344"],
            "CSEC": ["123", "124", "101", "250", "344"],
        }
    }

    const getUniversities = () => {
        return {
            1: "Rochester Institute of Technology",
            2: "University of Rochester"
        }
    }

    return (
        <div>
            <SetupPage subjects={getSubjects()} universities={getUniversities()}/>
        </div>
    );
}

export default App;
