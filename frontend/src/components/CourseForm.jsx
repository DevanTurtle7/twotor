import { useEffect, useState } from 'react';
import FormWrapper from './FormWrapper';
import Chip from './Chip';
import axios from 'axios';

function SubjectForm(props) {
    const [subject, setSubject] = useState(null)
    const [selected, setSelected] = useState(new Set())
    const [needUpdate, setNeedUpdate] = useState(false)
    const [courses, setCourses] = useState([])

    const onChange = (e) => {
        setSubject(parseInt(e.target.value))
        getCourses(e.target.value)
    }

    const getCourses = async (subjectID) => {
        await axios.get('http://ndawson.student.rit.edu/courses/' + subjectID).then(res => {
            setCourses(res.data)
        });
    }

    useEffect(() => {
        if (needUpdate) {
            setNeedUpdate(false)

            const index = props.index
            let complete = selected.size > 0
            props.setComplete(index, complete)
            props.callback(selected)
        }
    })

    const toggleCourse = (course) => {
        if (selected.has(course)) {
            setSelected(prev => new Set([...prev].filter(x => x !== course)))
        } else {
            setSelected(prev => new Set(prev.add(course)))
        }
        setNeedUpdate(true)
    }

    const removeCourse = (course) => {
        setSelected(prev => new Set([...prev].filter(x => x !== course)))
        setNeedUpdate(true)
    }

    const getChips = () => {
        const chips = []

        let subjectCode;

        for (let i = 0; i < props.subjects.length; i++) {
            let current = props.subjects[i]

            if (current.id === subject) {
                subjectCode = current.code
            }
        }

        if (subject !== null && subjectCode !== undefined) {
            for (let i = 0; i < courses.length; i++) {
                let current = courses[i]
                let active = selected.has(current)

                chips.push(<Chip
                    data={current}
                    text={current.code}
                    onClick={(x) => {
                    toggleCourse(x)}}
                    active={active}
                    key={i + current.code}
                />)
            }
        }

        return chips
    }

    const getSelectedChips = () => {
        const chips = []
        selected.forEach((current) => {
            chips.push(<Chip
                data={current}
                text={current.code}
                active={true}
                canDelete={true}
                onDelete={removeCourse}
                key={current.code}
            />)
        })

        return chips
    }

    const getOptions = () => {
        const options = []
        const subjects = props.subjects

        for (let i = 0; i < subjects.length; i++) {
            let current = subjects[i]
            let value = current.id
            let code = current.code

            options.push(<option value={value} key={code}>{code}</option>)
        }

        return options
    }

    return (
        <FormWrapper index={props.index} current={props.current}>
            <div className='subject-form'>
                <h2>{props.text}</h2>

                <select tabIndex={-1} onChange={onChange} defaultValue={"DEFAULT"}>
                    <option value="DEFAULT" disabled>Select subject...</option>
                    {getOptions()}
                </select>

                <div className='chip-container'>
                    {getChips()}
                </div>

                <h3 id='selected-courses-label'>Selected Courses</h3>
                <div className='selected-chip-container'>
                    {getSelectedChips()}
                </div>
            </div>
        </FormWrapper>
    )
}

export default SubjectForm;