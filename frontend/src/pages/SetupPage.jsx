import '../style/SetupPage.css';
import SchoolForm from '../components/SchoolForm';
import SubjectForm from '../components/SubjectForm';
import {Button} from 'reactstrap';
import { useState } from 'react';

const MAX_INDEX = 2;

function SetupPage(props) {
    const [index, setIndex] = useState(0);

    const next = () => {
        if (index < MAX_INDEX) {
            setIndex(index + 1)
        }
    }

    const prev = () => {
        if (index > 0) {
            setIndex(index - 1)
        }
    }

    return (
        <div className='page-col' id='setup-page'>
            <div className='form-container'>
                <SchoolForm index={0} current={index} />
                <SubjectForm index={1} current={index} />
            </div>

            <div className='form-footer'>
                <Button onClick={prev}>Back</Button>
                <Button onClick={next}>Next</Button>
            </div>
        </div>
    )
}

export default SetupPage;