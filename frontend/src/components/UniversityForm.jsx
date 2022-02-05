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

        for (let i = 0; i < universities.length; i++) {
            let current = universities[i]
            let id = current.id
            let name = current.name

            options.push(<option value={id} key={id}>{name}</option>)
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