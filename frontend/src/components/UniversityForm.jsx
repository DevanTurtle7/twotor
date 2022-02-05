import FormWrapper from "./FormWrapper";

function SchoolForm(props) {
    const onChange = () => {
        const index = props.index
        props.setComplete(index, true);
    }

    return (
        <FormWrapper index={props.index} current={props.current}>
            <h2>Select Your University</h2>

            <select onChange={onChange} defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled>Select your university...</option>
                <option value="rit">Rochester Institute of Technology</option>
            </select>
        </FormWrapper>
    )
}

export default SchoolForm;