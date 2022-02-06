import { useState } from "react"
import { FormGroup, Input } from "reactstrap"
import { useNavigate } from 'react-router-dom';

function LoginPage(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const usernameChanged = (e) => {
        setUsername(e.target.value)
    }

    const passwordChanged = (e) => {
        setPassword(e.target.value)
    }

    const login = () => {
        navigate("/home")
    }

    const cancel = () => {
        navigate("/")
    }

    return (
        <div className="page-col" id="login-page">
        <FormGroup>
            <h4>Username</h4>
            <Input type="text" onChange={usernameChanged}/>
        </FormGroup>

        <FormGroup>
            <h4>Password</h4>
            <Input type="password" onChange={passwordChanged}/>
        </FormGroup>

        <div className="form-footer">
        <button className="button-secondary" onClick={cancel}>Cancel</button>
        <button className="button-primary" onClick={login}>Sign In</button>
        </div>
        </div>
    )
}

export default LoginPage