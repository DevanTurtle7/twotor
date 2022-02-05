import { Button } from 'reactstrap';
import SetupPage from './pages/SetupPage';

function App() {
    const getUniversities = () => {
        return {
            1: "Rochester Institute of Technology",
            2: "University of Rochester"
        }
    }

    return (
        <div>
            <SetupPage universities={getUniversities()}/>
        </div>
    );
}

export default App;
