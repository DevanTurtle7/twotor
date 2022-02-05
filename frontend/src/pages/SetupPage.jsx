import '../style/SetupPage.css';
import UniversityForm from '../components/UniversityForm';
import CourseForm from '../components/CourseForm';
import { useState } from 'react';

const MAX_INDEX = 2;

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
            if (index === MAX_INDEX) {
                finish()
            } else {
                setIndex(index + 1)
            }
        }
    }

    const prev = () => {
        if (canGoPrev()) {
            setIndex(index - 1)
        }
    }

    const finish = () => {

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
                <UniversityForm index={0} current={index} setComplete={setComplete} />
                <CourseForm index={1} current={index} setComplete={setComplete} text="Select Courses You Want Help With"/>
                <CourseForm index={2} current={index} setComplete={setComplete} text="Select Courses You Can Help Others With"/>
            </div>

            <div className='form-footer'>
                <button onClick={prev} disabled={!canGoPrev()} className="button-secondary">Back</button>
                <button onClick={next} disabled={!canGoNext()} className="button-primary">{getButtonText()}</button>
            </div>
        </div>
    )
}

export default SetupPage;