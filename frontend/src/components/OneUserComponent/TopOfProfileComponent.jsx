// ICONS IMPORT
import { MdOutlinePlace } from 'react-icons/md';

const TopOfProfileComponent = ({ selectedUser }) => {

    const firstname = selectedUser.firstname ? selectedUser.firstname : "";
    const age = selectedUser.age ? ", " + selectedUser.age : "";
    const city = selectedUser.city ? selectedUser.city : "";
    const imageUrl = selectedUser.img ? `http://143-42-49-241.ip.linodeusercontent.com:8080/static/${selectedUser.img}` : "http://143-42-49-241.ip.linodeusercontent.com:8080/static/defaultimg.png";

    return (
        <>
            {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})` }} alt="profileimage" className="l-profile-img" />}
            <p className="m-weight">{firstname}{age? age  : ""}</p>
            <p className="grey-text s-font flex-row"><MdOutlinePlace className="xs-icon profile-icon"/>{city ? city : " sunknown"}</p>
        </>
    )
}

export default TopOfProfileComponent;