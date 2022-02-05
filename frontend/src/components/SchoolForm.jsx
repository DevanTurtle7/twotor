import FormWrapper from "./FormWrapper";

function SchoolForm(props) {
    return (
        <FormWrapper index={props.index} current={props.current}>
            <h1>This is my form weeeeeee</h1>
        </FormWrapper>
    )
}

export default SchoolForm;