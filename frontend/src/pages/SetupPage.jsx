import '../style/SetupPage.css';
import UniversityForm from '../components/UniversityForm';
import CourseForm from '../components/CourseForm';
import { useState } from 'react';
import AccountForm from '../components/AccountForm';
import axios from 'axios';

const MAX_INDEX = 3;

function SetupPage(props) {
    const [index, setIndex] = useState(0);
    const [accountInfo, setAccountInfo] = useState({})
    const [canHelp, setCanHelp] = useState(new Set())
    const [helpWith, setHelpWith] = useState(new Set())
    const [university, setUniversity] = useState(-1)
    const [subjects, setSubjects] = useState([])
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
        console.log(canHelp);
        console.log(accountInfo);
        console.log(helpWith);
        console.log(university);
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

    const helpWithUpdated = (data) => {
        setHelpWith(data)
    }

    const canHelpUpdated = (data) => {
        setCanHelp(data)
    }

    const accountInfoUpdated = (data) => {
        setAccountInfo(data)
    }

    const universityUpdated = (data) => {
        setUniversity(data)
        getSubjectsFromUniversity(data)
    }

    const getSubjectsFromUniversity = async (universityId) => {
        await axios.get('http://localhost:5000/subjects/' + universityId).then(res => {
            setSubjects(res.data)
        });
    }

    return (
        <div className='page-col' id='setup-page'>
            <div className='form-container'>
                <AccountForm index={0} current={index} setComplete={setComplete} callback={accountInfoUpdated} />
                <UniversityForm index={1} current={index} universities={props.universities} setComplete={setComplete} callback={universityUpdated} />
                <CourseForm
                    index={2}
                    current={index}
                    subjects={subjects}
                    setComplete={setComplete}
                    callback={helpWithUpdated}
                    text="Select Courses You Want Help With"
                />
                <CourseForm
                    index={3}
                    current={index}
                    subjects={subjects}
                    setComplete={setComplete}
                    callback={canHelpUpdated}
                    text="Select Courses You Can Help Others With"
                />
            </div>

            <div className='form-footer'>
                <button onClick={prev} disabled={!canGoPrev()} className="button-secondary">Back</button>
                <button onClick={next} disabled={!canGoNext()} className="button-primary">{getButtonText()}</button>
            </div>
        </div>
    )
}

export default SetupPage;