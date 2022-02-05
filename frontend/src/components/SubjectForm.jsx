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

    const onChange = (e) => {
        setSubject(e.target.value)
    }

    const addCourse = (courseName) => {
        if (selected.has(courseName)) {
            setSelected(prev => new Set([...prev].filter(x => x !== courseName)))
        } else {
            setSelected(prev => new Set(prev.add(courseName)))
        }

        const index = props.index
        let complete = selected.size > 0

        props.setComplete(index, complete)
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
                    key={courseName}
                    onClick={addCourse}
                    active={active}
                />)
            }
        }

        return chips
    }

    return (
        <FormWrapper index={props.index} current={props.current}>
            <h2>Select your courses...</h2>

            <select onChange={onChange} defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled>Select subject...</option>
                <option value="SWEN">SWEN</option>
                <option value="GCIS">GCIS</option>
                <option value="MATH">MATH</option>
                <option value="ISTE">ISTE</option>
                <option value="STSO">STSO</option>
                <option value="CSEC">CSEC</option>
            </select>

            <div className='chip-container'>
                {getChips()}
            </div>
        </FormWrapper>
    )
}

export default SubjectForm;