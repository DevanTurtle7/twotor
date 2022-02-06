import { useNavigate } from 'react-router-dom';

function LogoutPage(props) {
    document.cookie = ""
    const navigate = useNavigate()

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


    fetch('http://ndawson.student.rit.edu/logout', {
        method: "GET",
        headers: {
            'Authorization': getCookie('cookie'),
            'Content-Type': 'application/json'
        }
    }).then(response => response.json()).then(response => {
        navigate('/')
    })

    return (null)
}

export default LogoutPage