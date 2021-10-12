import React, {useState} from "react";
import { FaSearch, FaSpinner, FaSun, FaCloudSunRain, FaCloud,FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';




const CityComponent = ({name,state,temp,wind,description,icon,id}) => {

const[inputFavoriteCityDeletedText, setFavoriteCityDeletedText] = useState(false);


    const removeFromeFavorites = async () => {
        const endpoint = "http://localhost:8080/cities/update"
        const data = {
          id:id,
          city: name,
          state: state,
          favorite:0
        }
    
        const configs = {
          method: "PUT",
          mode: "cors",
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", 'Accept': 'application/json' },
          body: JSON.stringify(data)
        }
    
        const response = await fetch(endpoint, configs);
        console.log(response)
        const res = response.json
        if (response.status === 200) {
          console.log(res)
          setFavoriteCityDeletedText(true)
          setTimeout(citydeletedTimeout, 5000)
          
        }
        else {
          console.log("error")
        }
      }



      const citydeletedTimeout = () => {
        setFavoriteCityDeletedText(false);
      };

    const iconApi = ('http://openweathermap.org/img/w/' + icon + '.png')

    console.log(iconApi.url)
    
    function round(num) {
        return Math.ceil(num)
      }
    return (
        <div className = "favoriteCityCard">

            <h4> {name} <span> ({state})</span> </h4>
            
            <h2> {round(temp) + " " + "F"} </h2>
                {/* <p> {wind + " " + "MPH"}</p> */}
               

                <img src = {iconApi} width = "100" height = 
                "150"></img>

<h5> {description}</h5>
         <p> Remove {name} from your favorites <span> <button type="button" onClick={(e) => removeFromeFavorites()}>
              {' '}
             <FaTrash/> </button> </span> </p>
                
              {inputFavoriteCityDeletedText && <p className = "removed-Fave-City-Text"> {name} has been removed from favorites</p>} 
        </div>
    )
}

export default CityComponent;
