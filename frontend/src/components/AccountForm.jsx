import FormWrapper from "./FormWrapper"
import { Input, FormGroup } from 'reactstrap'
import { useEffect, useState } from "react"

function AccountForm(props) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [needUpdated, setNeedUpdate] = useState(false)

    useEffect(() => {
        if (needUpdated) {
            setNeedUpdate(false)
            let valid = validEmail() && validUsername() && validPassword() && validFirstName() && validLastName()
            let index = props.index
            props.setComplete(index, valid)
            props.callback({
                first_name: firstName,
                last_name: lastName,
                email: email,
                username: username,
                password: password
            })
        }
    })

    const firstNameUpdated = (e) => {
        setFirstName(e.target.value)
        setNeedUpdate(true)
    }

    const lastNameUpdated = (e) => {
        setLastName(e.target.value)
        setNeedUpdate(true)
    }

    const emailUpdated = (e) => {
        setEmail(e.target.value)
        setNeedUpdate(true)
    }

    const usernameUpdated = (e) => {
        setUsername(e.target.value)
        setNeedUpdate(true)
    }

    const passwordUpdated = (e) => {
        setPassword(e.target.value)
        setNeedUpdate(true)
    }

    const validFirstName = () => {
        return firstName !== ""
    }

    const validLastName = () => {
        return lastName !== ""
    }

    const validEmail = () => {
        return email !== ""
    }
    
    const validUsername = () => {
        return username !== ""
    }

    const validPassword = () => {
        return password !== ""
    }

    return (
        <FormWrapper index={props.index} current={props.current}>
            <div>
                <h2>Create Account</h2>

                <div className="create-account-form-group form-group-split">
                    <FormGroup>
                        <h4>First name</h4>
                        <Input type="text" onChange={firstNameUpdated}></Input>
                    </FormGroup>
                    <FormGroup>
                        <h4>Last name</h4>
                        <Input type="text" onChange={lastNameUpdated}></Input>
                    </FormGroup>
                </div>

                <div className="create-account-form-group">
                    <FormGroup>
                        <h4>Enter your Email</h4>
                        <Input type="email" onChange={emailUpdated}></Input>
                    </FormGroup>
                </div>

                <div className="create-account-form-group">
                    <FormGroup>
                        <h4>Enter your Username</h4>
                        <Input type="text" onChange={usernameUpdated}></Input>
                    </FormGroup>
                </div>

                <div className="create-account-form-group">
                    <FormGroup>
                        <h4>Enter your Password</h4>
                        <Input type="password" onChange={passwordUpdated}></Input>
                    </FormGroup>
                </div>
            </div>
        </FormWrapper>
    )
}

export default AccountForm