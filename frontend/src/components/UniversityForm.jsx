import FormWrapper from "./FormWrapper";

function SchoolForm(props) {
    const onChange = (e) => {
        const index = props.index
        props.setComplete(index, true);
        props.callback(e.target.value)
    }
    
    const getOptions = () => {
        let options = []
        let universities = props.universities
        let keys = Object.keys(universities)

        for (let i = 0; i < keys.length; i++) {
            let value = keys[i]
            let name = universities[value]

            options.push(<option value={value} key={value}>{name}</option>)
        }

        return options
    }

    return (
        <FormWrapper index={props.index} current={props.current}>
            <h2>Select Your University</h2>

            <select onChange={onChange} defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled>Select your university...</option>
                {getOptions()}
            </select>
        </FormWrapper>
    )
}

export default SchoolForm;