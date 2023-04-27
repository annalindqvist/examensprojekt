import { useEffect, useState }from 'react';
import { useAuthContext } from "../hooks/useAuthContext";

const EditProfile = () => {
    
    // -----------------------
    // TODO: 

    // show default value of userinformation if any
    // show image if any uploaded
    // choose between interests/hobbies and save to profile
    // move cities to a json file and map them out + more cities in sweden
    // -----------------------

    const {user, dispatch} = useAuthContext();
    
    const imageUrl = `http://localhost:8080/static/${user.img}`;

    const [image, setImage] = useState();
    const [age, setAge] = useState();
    const [city, setCity] = useState();
    const [description, setDescription] = useState();
    const [intrests, setInterests] = useState([]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      await editProfile();
    }  

    const editProfile = async () => {

        const token = localStorage.getItem('token');

        if (token) {
            const formData = new FormData();

            if (image) formData.append('image', image);
            if (age) formData.append('age', age)
            if (city) formData.append('city', city);
            if (description) formData.append('description', description);

            const res = await fetch('http://localhost:8080/user/edit', {
            method: 'PUT',
            headers: {'Authorization': `Bearer ${token}`},
            body: formData,
            })
            const json = await res.json();

            if (!res.ok) {
            console.log("error", json)
            };
            if (res.ok) {
           
            // update user in context & local storage
            localStorage.setItem('user', JSON.stringify(json.user));
            dispatch({type: 'UPDATEUSER', payload: json.user});
            }
        }
    }

    const cities = ["Alingsås", "Arboga", "Eskilstuna", "Enköping", "Fagersta", "Falun", "Göteborg", "Gävle", "Katrineholm", "Örebro"];
  

    return (
      <div>
        <p>Edit profile</p>
        <form onSubmit={handleSubmit} encType='multioart/form-data'>

          <input type="file" name="image" id="image" onChange={(e) => setImage(e.target.files[0])}/>
          <p>Your age</p>
          <input type="number" name="age" id="age" onChange={(e) => setAge(e.target.value)}/>
          <p>What city is closest to you?</p>
          <select name="city" id="city" onChange={(e) => setCity(e.target.value)}>
              {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
              ))} 
          </select>
          <p>A small description of you</p>
          <textarea name="description" id="description" cols="30" rows="10" onChange={(e) => setDescription(e.target.value)}/>
          <input type="submit" value="Save my profile" />
        </form>
    </div>
    );
  };
  
  export default EditProfile;