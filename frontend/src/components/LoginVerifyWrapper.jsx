import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginVerifyWrapper(props) {
    const navigator = useNavigate();

    const getCookie = (cname) => {
        // Code from w3 schools :)
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }

    useEffect(() => {
        let cookie = getCookie('cookie')
        let reverse = props.reverse === true

        if (cookie === null && !reverse) {
            navigator('/login')
        } else if (cookie !== null && reverse) {
            navigator('/home')
        }
    })


    return props.children
}

export default LoginVerifyWrapper;