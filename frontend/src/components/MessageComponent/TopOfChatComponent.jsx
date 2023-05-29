// IMPORT REACT
import { Link } from "react-router-dom";

// IMPORT COMPONENT
import BackBtnComponent from "../GoBackBtnComponent/BackBtnComponent";

const TopOfChatComponent = ({ selectedUser }) => {

    const imageUrl = selectedUser.img ? `http://localhost:8080/static/${selectedUser.img}` : 'http://localhost:8080/static/defaultimg.png';

    return (
        <>
            <BackBtnComponent />
            <Link to={`/user/${selectedUser._id}`} className="flex-row">
                {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})` }} alt="profileimage" className="s-profile-img" />}
                <p>{selectedUser.firstname}</p>
            </Link>
        </>
    );
}

export default TopOfChatComponent;