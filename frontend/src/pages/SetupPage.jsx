import '../style/SetupPage.css';
import SchoolForm from '../components/SchoolForm';
import SubjectForm from '../components/SubjectForm';
import { Button } from 'reactstrap';
import { useState } from 'react';

const MAX_INDEX = 1;

function SetupPage(props) {
    const [index, setIndex] = useState(0);
    const [completedForms, setCompletedForms] = useState({
        0: false,
        1: false
    })

    const canGoNext = () => currentCompleted()
    const canGoPrev = () => index > 0

    const next = () => {
        if (canGoNext()) {
            setIndex(index + 1)
        }
    }

    const prev = () => {
        if (canGoPrev()) {
            setIndex(index - 1)
        }
    }

    const currentCompleted = () => {
        return completedForms[index]
    }

    const setComplete = (index, complete) => {
        setCompletedForms(completedForms => ({
            ...completedForms,
            [index]: complete
        }))
    }

    const getButtonText = () => index === MAX_INDEX ? "Finish" : "Next"

    return (
        <div className='page-col' id='setup-page'>
            <div className='form-container'>
                <SchoolForm index={0} current={index} setComplete={setComplete}/>
                <SubjectForm index={1} current={index} setComplete={setComplete} />
            </div>

            <div className='form-footer'>
                <Button onClick={prev} disabled={!canGoPrev()}>Back</Button>
                <Button onClick={next} color='primary' disabled={!canGoNext()}>{getButtonText()}</Button>
            </div>
        </div>
    )
}

export default SetupPage;