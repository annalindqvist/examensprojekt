// IMPORT HOOKS
import { useAuthContext } from '../../hooks/useAuthContext';

// ICONS IMPORT
import { MdOutlinePlace } from 'react-icons/md';

const TopOfProfileComponent = ({ selectedUser }) => {

    const {user} = useAuthContext();
    const firstname = user.firstname ? user.firstname : "";
    const age = user.age ? ", " + user.age : "";
    const city = user.city ? user.city : "";
    const imageUrl = user.img ? `http://localhost:8080/static/${user.img}` : "http://localhost:8080/static/defaultimg.png";

    return (

        <>
            {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})` }} alt="profileimage" className="l-profile-img" />}
            <p className="m-weight">{firstname}{age? age  : ""}</p>
            <p className="grey-text s-font flex-row"><MdOutlinePlace className="xs-icon profile-icon"/>{city ? city : " sunknown"}</p>
        </>

    )
}

export default TopOfProfileComponent;