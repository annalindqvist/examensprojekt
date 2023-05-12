// REACT IMPORTS
import {  useState }from 'react';

// HOOKS IMPORTS
import { useAuthContext } from "../hooks/useAuthContext";

import env from "react-dotenv";
// `${env.REACT_APP_API_URL}/`

const EditProfile = () => {
    
    // -----------------------
    // TODO: 
    // move cities to a json file and map them out + more cities in sweden
    // -----------------------

    const {user, dispatch} = useAuthContext();
   
    const [age, setAge] = useState(user.age);
    const [city, setCity] = useState(user.city);
    const [description, setDescription] = useState(user.description);
    const [intrests, setInterests] = useState(user.intrests);

    const handleSubmit = async (e) => {
      e.preventDefault();
      await editProfile();
    }  

    const handleCheckbox = (e) => {
      const checkedValue = e.target.value;
      const aldreadyChecked = intrests.find(e => e === checkedValue);
      if (!aldreadyChecked) {
        return setInterests([...intrests, checkedValue]);
      }
      else {
        return setInterests(intrests.filter(i => i !== checkedValue ))
      }
    }
    
    const editProfile = async () => {

        const token = localStorage.getItem('token');

        if (token) {

            const res = await fetch('http://localhost:8080/user/edit', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify({ age, city, description, intrests}),
            })
            const json = await res.json();

            if (!res.ok) {
            console.log("error", json);
            }
            if (res.ok) {
           
            // update user in context & local storage
            localStorage.setItem('user', JSON.stringify(json.user));
            dispatch({type: 'UPDATE_USER', payload: json.user});
            }
        }
    }

    const cities = ["Alingsås", "Arboga", "Eskilstuna", "Enköping", "Fagersta", "Falun", "Göteborg", "Gävle", "Katrineholm", "Örebro"];
  

    return (
      <div>
        <p>Edit profile</p>
        <form onSubmit={handleSubmit} encType='multioart/form-data'>

          {/* <input type="file" name="image" id="image" onChange={(e) => setImage(e.target.files[0])}/> */}
          <p>Your age</p>
          <input type="number" name="age" id="age" value={age} onChange={(e) => setAge(e.target.value)}/>
          <p>What city is closest to you?</p>
          <select name="city" id="city" onChange={(e) => setCity(e.target.value)} defaultValue={city}>
              {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
              ))} 
          </select>
          <p>A small description of you</p>
          <textarea name="description" id="description" cols="30" rows="10" defaultValue={description} onChange={(e) => setDescription(e.target.value)}/>
          <p>What i like to do..</p>
          <div>
            <p>Game nights</p>
            <input type="checkbox" name="Gamenights" value="Gamenights" checked={intrests.includes('Gamenights')} onChange={handleCheckbox}/>
          </div>
          <div>
            <p>Shopping</p>
            <input type="checkbox" name="Shopping" value="Shopping" checked={intrests.includes('Shopping')} onChange={handleCheckbox}/>
          </div>
          <div>
            <p>Workout</p>
            <input type="checkbox" name="Workout" value="Workout" checked={intrests.includes('Workout')} onChange={handleCheckbox}/>
          </div>
          <div>
            <p>Party nights</p>
            <input type="checkbox" name="Partynights" value="Party nights" checked={intrests.includes('Party nights')} onChange={handleCheckbox}/>
          </div>
          <div>
            <p>Movienights</p>
            <input type="checkbox" name="Movienights" value="Movienights" checked={intrests.includes('Movienights')} onChange={handleCheckbox}/>
          </div>
          <div>
            <p>Walks</p>
            <input type="checkbox" name="Walks" value="Walks" checked={intrests.includes('Walks')} onChange={handleCheckbox}/>
          </div>
          <div>
            <p>Travelling</p>
            <input type="checkbox" name="Travelling" value="Travelling" checked={intrests.includes('Travelling')} onChange={handleCheckbox}/>
          </div>

          <input type="submit" value="Save my profile" onChange={handleCheckbox}/>
        </form>
    </div>
    );
  };
  
  export default EditProfile;