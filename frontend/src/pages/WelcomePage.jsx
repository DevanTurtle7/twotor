import "../style/WelcomePage.css"
import { Link } from "react-router-dom";

function WelcomePage(props) {
    return (
        <div className="page-col">
            <h1 id="welcome-header"><span className="blue-text">two</span><span className="light-blue-text">tor.</span></h1>
            <h5>Connect with real students to get real help</h5>
            <Link to="/login"><button>Sign In</button></Link>
            <Link to="/createAccount"><button>Sign Up</button></Link>
        </div>
    )
}

export default WelcomePage