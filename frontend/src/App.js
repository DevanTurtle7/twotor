import { Button } from 'reactstrap';
import SetupPage from './pages/SetupPage';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
    const [universities, setUniversities] = useState({})

    const getUniversities = async () => {
        await axios.get('http://localhost:5000/universities').then(res => {
            setUniversities(res.data)
        });
    }

    useEffect(() => {
        getUniversities()
    }, [])

    return (
        <div>
            <SetupPage universities={universities}/>
        </div>
    );
}

export default App;
