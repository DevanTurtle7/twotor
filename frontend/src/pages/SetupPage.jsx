import '../style/SetupPage.css';
import SchoolForm from '../components/SchoolForm';
import SubjectForm from '../components/SubjectForm';

function SetupPage(props) {

    return (
        <div className='page-col'>
            <div className='form-container'>
                <SchoolForm />
                <SubjectForm />
            </div>
        </div>
    )
}

export default SetupPage;