import { useState } from "react";
import {
    Dropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem
} from "reactstrap";
import FormWrapper from "./FormWrapper";

function SchoolForm(props) {
    const onChange = () => {
        const index = props.index
        props.setComplete(index, true);
    }

    return (
        <FormWrapper index={props.index} current={props.current}>
            <h2>Select your university</h2>

            <select onChange={onChange}>
                <option value="" disabled selected>Select your university...</option>
                <option>Rochester Institute of Technology</option>
            </select>
        </FormWrapper>
    )
}

export default SchoolForm;