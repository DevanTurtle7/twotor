import { useEffect, useState } from 'react';
import FormWrapper from './FormWrapper';
import Chip from './Chip';

const SUBJECTS = {
    "SWEN": ["123", "124", "101", "250", "344"],
    "GCIS": ["123", "124", "101", "250", "344"],
    "MATH": ["123", "124", "101", "250", "344"],
    "ISTE": ["123", "124", "101", "250", "344"],
    "STSO": ["123", "124", "101", "250", "344"],
    "CSEC": ["123", "124", "101", "250", "344"],
}

function SubjectForm(props) {
    const [subject, setSubject] = useState(null)
    const [selected, setSelected] = useState(new Set())
    const [needUpdate, setNeedUpdate] = useState(false)

    const onChange = (e) => {
        setSubject(e.target.value)
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

    const toggleCourse = (courseName) => {
        if (selected.has(courseName)) {
            setSelected(prev => new Set([...prev].filter(x => x !== courseName)))
        } else {
            setSelected(prev => new Set(prev.add(courseName)))
        }
        setNeedUpdate(true)
    }

    const removeCourse = (courseName) => {
        setSelected(prev => new Set([...prev].filter(x => x !== courseName)))
        setNeedUpdate(true)
    }

    const getChips = () => {
        const chips = []

        if (subject != null) {
            let courseNumbers = SUBJECTS[subject]

            for (let i = 0; i < courseNumbers.length; i++) {
                let current = courseNumbers[i]
                let courseName = subject + "-" + current
                let active = selected.has(courseName)

                chips.push(<Chip
                    text={courseName}
                    onClick={toggleCourse}
                    active={active}
                    key={courseName}
                />)
            }
        }

        return chips
    }

    const getSelectedChips = () => {
        const chips = []

        selected.forEach((current) => {
            chips.push(<Chip
                text={current}
                active={true}
                canDelete={true}
                onDelete={removeCourse}
                key={current}
            />)
        })

        return chips
    }

    const getOptions = () => {
        const options = []
        let keys = Object.keys(SUBJECTS)

        for (let i = 0; i < keys.length; i++) {
            let current = keys[i]
            options.push(<option value={current} key={current}>{current}</option>)
        }

        return options
    }

    return (
        <FormWrapper index={props.index} current={props.current}>
        <div className='subject-form'>
            <h2>{props.text}</h2>

            <select onChange={onChange} defaultValue={"DEFAULT"}>
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