// REACT IMPORTS
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';

// HOOKS IMPORTS
import { useAuthContext } from "../hooks/useAuthContext";

// JSON IMPORTS
import citiesData from "../json/cities.json";
import interestsDataJson from "../json/intrests.json";

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
import BackBtnComponent from '../components/GoBackBtnComponent/BackBtnComponent';


const EditProfile = () => {

  const [cities, setCities] = useState([]);
  const [interestsData, setInterestsData] = useState([]);

  const { user, dispatch } = useAuthContext();

  const [age, setAge] = useState(user.age);
  const [city, setCity] = useState(user.city);
  const [description, setDescription] = useState(user.description);
  const [intrests, setInterests] = useState(user.intrests);

  // Cities & intersts from JSON file
  useEffect(() => {
    setCities(citiesData.towns);
    setInterestsData(interestsDataJson.interests);
    setInterests(user?.intrests)

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editProfile();
  }

  const handleCheckbox = (e) => {
    const checkedValue = e.target.value;
    const aldreadyChecked = intrests.find(e => e === checkedValue);
    if (!aldreadyChecked && intrests.length < 3) {
      return setInterests([...intrests, checkedValue]);
    }
    else {
      return setInterests(intrests.filter(i => i !== checkedValue))
    }
  }

  const editProfile = async () => {

    const token = localStorage.getItem('token');

    if (token) {

      const res = await fetch('http://localhost:8080/user/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ age, city, description, intrests }),
      })
      const json = await res.json();

      if (!res.ok) {
        console.log("error", json);
      }
      if (res.ok) {

        // update user in context & local storage
        localStorage.setItem('user', JSON.stringify(json.user));
        dispatch({ type: 'UPDATE_USER', payload: json.user });
      }
    }
  }

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
    <>
      <Navbar />
      <div className="pink-background centered-content-column">
        <div className=" edit-profile">
        <BackBtnComponent />
          <h1>Edit profile</h1>
          <form onSubmit={handleSubmit} encType='multioart/form-data' className="edit-profile-form">
            <p className="m-font">Your age</p>
            <input type="number" name="age" id="edit-age" value={age} onChange={(e) => setAge(e.target.value)} />
            <p className="m-font">What city is closest to you?</p>
            <select name="city" id="edit-city" className="custom-select" onChange={(e) => setCity(e.target.value)} value={city}>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <p className="m-font">A small description of you</p>
            <textarea name="description" id="edit-description" cols="30" rows="10" defaultValue={description} onChange={(e) => setDescription(e.target.value)} />

            <p className="m-font">What do you like to do? <span className="xs-font">(choose max 3)</span></p>
            {interestsData.map((hobby) => (
              <div key={hobby} className="flex-row hobby-container">
                {renderIcon(hobby)}
                <p className="m-font">{hobby}</p>
                <input type="checkbox" name={hobby} value={hobby} checked={intrests.includes(hobby)} onChange={handleCheckbox} />
              </div>
            ))}

            <input type="submit" value="Save my profile" onChange={handleCheckbox} />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;