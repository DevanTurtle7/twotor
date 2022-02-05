import { Link } from "react-router-dom";

function WelcomePage(props) {
    return (
        <div className="page-col">
            <h1>twotor.</h1>
            <h5>Connect with real students to get real help</h5>
            <Link to="/login"><button>Sign In</button></Link>
            <Link to="/createAccount"><button>Sign Up</button></Link>
        </div>
    )
}

export default WelcomePage