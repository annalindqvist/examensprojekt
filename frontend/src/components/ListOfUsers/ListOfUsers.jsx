// REACT IMPORTS 
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// CSS
import './ListOfUsers.css';

// ICON IMPORTS
import { BsBook } from 'react-icons/bs';
import { TbChefHat, TbBrandWechat, TbCoffee, } from 'react-icons/tb';
import { AiOutlineShopping } from 'react-icons/ai';
import { RiMovie2Line } from 'react-icons/ri';
import { IoDiceOutline } from 'react-icons/io5';
import { BiParty } from 'react-icons/bi';
import { CgGym } from 'react-icons/cg';
import { FiMusic } from 'react-icons/fi';
import { TiWine } from 'react-icons/ti';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { FaShoePrints } from 'react-icons/fa';
import { IoHeartSharp } from 'react-icons/io5';
import { GoGlobe } from 'react-icons/go';


const ListOfUsers = ({ user }) => {

  const firstname = user.firstname ? user.firstname : "Unknown";
  const age = user.age ? user.age : "Unknown";
  const city = user.city ? user.city : "Unknown";
  const intrests = user.intrests ? user.intrests : null;
  const [description, setDescription] = useState(null);
  const imageUrl = user.img ? `http://localhost:8080/static/${user.img}` : 'http://localhost:8080/static/defaultimg.png';

  useEffect(() => {

    if (user.description?.length > 66) {
      setDescription(user.description?.substring(0, 66) + "...")
    }
    else {
      setDescription(user.description);
    }

  }, [user]);


  // Icons for interests
  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Reading':
        return <BsBook className="xs-icon" />;
      case 'Cooking':
        return <TbChefHat className="xs-icon" />;
      case 'Shopping':
        return <AiOutlineShopping className="xs-icon" />;
      case 'Movie nights':
        return <RiMovie2Line className="xs-icon" />;
      case 'Girl talk':
        return <TbBrandWechat className="icon" />;
      case 'Working out':
        return <CgGym className="xs-icon" />;
      case 'Swedish fika':
        return <TbCoffee className="xs-icon" />;
      case 'Afterwork':
        return <TiWine className="xs-icon" />;
      case 'Dinners':
        return <GiForkKnifeSpoon className="xs-icon" />;
      case 'Walks':
        return <FaShoePrints className="xs-icon" />;
      case 'Conserts':
        return <FiMusic className="xs-icon" />;
      case 'Game nights':
        return <IoDiceOutline className="xs-icon" />;
      case 'Party nights':
        return <BiParty className="xs-icon" />;
      case 'Travelling':
        return <GoGlobe className="xs-icon" />;
      default:
        return <IoHeartSharp className="xs-icon" />;
    }
  };


  return (
    <>
      <Link to={`/user/${user._id}`}>
        <div className="user-card-container flex-column">
          <div className="user-card-top">
            {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})` }} alt="profileimage" className="m-profile-img" />}
            <div className="flex-column">
              <div className="flex-column notification-parent-list">
                <p >{firstname}</p>
                <div className="time-city">
                  <p className="xs-font grey-text">{age ? age + " | " : ""}{city}</p>
                </div>
                <p className="s-font">{description ? description : ''}</p>

              </div>

            </div>
          </div>
         
        </div>
      </Link>
    </>
  )
}

export default ListOfUsers;