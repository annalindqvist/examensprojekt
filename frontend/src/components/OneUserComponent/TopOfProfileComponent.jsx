// REACT IMPORTS
import { Link } from 'react-router-dom';

// ICONS IMPORT
import { MdOutlinePlace } from 'react-icons/md';

const TopOfProfileComponent = ({ selectedUser }) => {

    // const URL1 = "http://localhost:8080/feed";
    // const URL2 = "http://localhost:8080/feed";


    const firstname = selectedUser.firstname ? selectedUser.firstname : "";
    const age = selectedUser.age ? ", " + selectedUser.age : "";
    const city = selectedUser.city ? selectedUser.city : "";


    const imageUrl = selectedUser.img ? `http://localhost:8080/static/${selectedUser.img}` : "http://localhost:8080/static/defaultimg.png";
    const userId = selectedUser._id;

    console.log(selectedUser)

    return (

        <>
            {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})` }} alt="profileimage" className="l-profile-img" />}
            <p className="m-weight">{firstname}{age? age  : ""}</p>
            <p className="grey-text s-font flex-row"><MdOutlinePlace className="xs-icon profile-icon"/>{city ? city : " sunknown"}</p>
        </>

    )
}

export default TopOfProfileComponent;