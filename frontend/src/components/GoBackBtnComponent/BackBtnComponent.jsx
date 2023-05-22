import { useNavigate } from 'react-router';

// IMPORT ICONS
import { IoChevronBackOutline } from 'react-icons/io5';

const BackBtnComponent = () => {
    const navigate = useNavigate();
    return ( 
        <button onClick={() => navigate(-1)} className="back-component-btn"><IoChevronBackOutline className="back-icon"/></button>
     );
}
 
export default BackBtnComponent;