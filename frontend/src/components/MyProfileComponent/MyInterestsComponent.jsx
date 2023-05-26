// IMPORT HOOKS
import { useAuthContext } from "../../hooks/useAuthContext";

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

const InterestsComponent = () => {

  const { user } = useAuthContext();
  const intrests = user.intrests ? user.intrests : null;

  // Icons for interests
  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Reading':
        return <BsBook className="icon" />;
      case 'Cooking':
        return <TbChefHat className="icon" />;
      case 'Shopping':
        return <AiOutlineShopping className="icon" />;
      case 'Movie nights':
        return <RiMovie2Line className="icon" />;
      case 'Girl talk':
        return <TbBrandWechat className="icon" />;
      case 'Working out':
        return <CgGym className="icon" />;
      case 'Swedish fika':
        return <TbCoffee className="icon" />;
      case 'Afterwork':
        return <TiWine className="icon" />;
      case 'Dinners':
        return <GiForkKnifeSpoon className="icon" />;
      case 'Walks':
        return <FaShoePrints className="icon" />;
      case 'Conserts':
        return <FiMusic className="icon" />;
      case 'Game nights':
        return <IoDiceOutline className="icon" />;
      case 'Party nights':
        return <BiParty className="icon" />;
      case 'Travelling':
        return <GoGlobe className="icon" />;
      default:
        return <IoHeartSharp className="icon" />;
    }
  };

  return (

    <div className="info-content-container m-font flex-column">
      {intrests?.map((interest) => (
        <div className="interest-container flex-row" key={intrests}>
          {renderIcon(interest)}
          <p>{interest}</p>
        </div>))}
    </div>

  )
}

export default InterestsComponent;