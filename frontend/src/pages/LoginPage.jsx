import '../style/LoginPage.css';
import { useState } from "react"
import { FormFeedback, FormGroup, Input } from "reactstrap"
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function LoginPage(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [invalidLogin, setInvalidLogin] = useState(false)
    const navigate = useNavigate()

    const usernameChanged = (e) => {
        setUsername(e.target.value)
        setInvalidLogin(false)
    }

    const passwordChanged = (e) => {
        setPassword(e.target.value)
        setInvalidLogin(false)
    }

    const login = async () => {
        await axios.post('http://ndawson.student.rit.edu/login', {
            'username': username,
            'password': password
        }).then(res => {
            if (res.data.valid) {
                navigate("/home")
            } else {
                setInvalidLogin(true)
            }
        });

    }

    const cancel = () => {
        navigate("/")
    }

    return (
        <div className="page-col" id="login-page">
            <div id="login-container">
                <FormGroup>
                    <h4>Username</h4>
                    <Input type="text" onChange={usernameChanged} invalid={invalidLogin}/>
                    <h4>Password</h4>
                    <Input type="password" onChange={passwordChanged} invalid={invalidLogin} />
                    <FormFeedback>
                        Invalid username or password
                    </FormFeedback>
                </FormGroup>

                <div className="form-footer">
                    <button className="button-secondary" onClick={cancel}>Cancel</button>
                    <button className="button-primary" onClick={login} disabled={invalidLogin}>Sign In</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage