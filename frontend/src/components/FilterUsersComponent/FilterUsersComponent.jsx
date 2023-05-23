import { useEffect, useState } from "react";
// IMPORT HOOKS
import { useUserContext } from "../../hooks/useUserContext";
import { useAuthContext } from "../../hooks/useAuthContext";


// IMPORT JSON
import citiesData from "../../json/cities.json";

const FilterUserComponent = ({onStateChange, onErrorChange}) => {

    const { listOfUsers, dispatch } = useUserContext();
    const { user } = useAuthContext();

    const [city, setCity] = useState(user.city)
    console.log(user)
    const [cities, setCities] = useState([]);


    useEffect(() => {
        setCities(citiesData.towns);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // filter on city
        const filteredUsers = listOfUsers.filter((user) => user.city === city)

        if(filteredUsers.length > 0){
            dispatch({ type: 'SET_USERS', payload: filteredUsers });
        } else {
            onErrorChange("No users match your filter.");
        }
        
        closeFilter();
        
    }

    const closeFilter = () =>{
        // close the filter container
        onStateChange(false);
    }

    return (
        <div className="filter-users-container">
           
            <h1 className="settings-h1">Filter all users</h1>
            
            <form onSubmit={handleSubmit} className="flex-column">
                <p className="s-font">City</p>
                <select name="city" id="city" className="custom-select-filter" onChange={(e) => setCity(e.target.value)} value={city}>
                    {cities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
               
                <input className="form-button" type="submit" value="Save" />

            </form>

        </div>
    );
}

export default FilterUserComponent;