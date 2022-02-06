import '../style/SetupPage.css';
import UniversityForm from '../components/UniversityForm';
import CourseForm from '../components/CourseForm';
import { useState } from 'react';
import AccountForm from '../components/AccountForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    const canGoNext = () => currentCompleted()

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
        if (index === 0) {
            cancel()
        } else {
            setIndex(index - 1)
        }
    }

    const cancel = () => {
        navigate('/')
    }

    const setToArray = (set) => {
        let array = []

        set.forEach((current) => {
            array.push(current)
        })

        return array
    }

    const finish = () => {
        const data = {
            "first_name": accountInfo["first_name"],
            "last_name": accountInfo["last_name"],
            "email": accountInfo["email"],
            "username": accountInfo["username"],
            "password": accountInfo["password"],
            "canHelp": setToArray(canHelp),
            "helpWith": setToArray(helpWith),
            "university_id": university
        };
        axios.post('http://ndawson.student.rit.edu/signup', data);
        navigate('/home')
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

    const getNextButtonText = () => index === MAX_INDEX ? "Finish" : "Next"
    const getBackButtonText = () => index === 0 ? "Cancel" : "Back"

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
        await axios.get('http://ndawson.student.rit.edu/subjects/' + universityId).then(res => {
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
                <button onClick={prev} className="button-secondary">{getBackButtonText()}</button>
                <button onClick={next} disabled={!canGoNext()} className="button-primary">{getNextButtonText()}</button>
            </div>
        </div>
    )
}

export default SetupPage;