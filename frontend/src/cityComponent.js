import React, {useState,useEffect} from "react";
import { FaSearch, FaSpinner, FaSun, FaCloudSunRain, FaCloud,FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleMapReact from 'google-map-react';




const CityComponent = ({name,state,temp,wind,description,icon,id}) => {

const[inputFavoriteCityDeletedText, setFavoriteCityDeletedText] = useState(false);
const [lat,setLatitude] = useState('');
const [lon, setLongtide] = useState('');

useEffect(() => {getCityFromLongAndLat()},[])
// const img = "https://media.architecturaldigest.com/photos/58f918044f42bd463db36a3f/16:9/w_1280,c_limit/1%20-%2010%20Greenest%20Cities%20in%20America%20in%202017.jpg"
    
const AnyReactComponent = ({ text }) => <div>{text}</div>;





const getCityFromLongAndLat = async () =>{
  
  const configs = {
    method: "GET"
  }

    console.log(lat)
    console.log(lon)
    const endpoint = `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=27b3ec19c7d34c1bcca082098b7a60a7`;
  
    const response = await fetch(endpoint,configs)
    const datas = await response.json();
    console.log(datas['coord'].lon)
    setLatitude(
      datas['coord'].lat
    )
    setLongtide(datas['coord'].lon)
    if(response.status ===200){
    }
        else{
          console.log( "error grabbing city name")
        }
  } 




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


      <div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">

    <div  style={{ height: '17vh', width: '100%', color:"purple" }}>
       <GoogleMapReact
         bootstrapURLKeys={{ key:'AIzaSyA1HIKef045IgF-MDEbH5gQBqAbuLcdxzo' }}
         zoom = {8}
         center = {{lat:lat,lng:lon}}
          hoverDistance= {15}
        >      
            <AnyReactComponent
           lat={lat}
           lng={lon}
           text={name}
          />
       </GoogleMapReact>
       </div>
    <h4> {name} <span> ({state})</span> </h4>
   
    </div>
    <div class="flip-card-back">

    
       <h2> {round(temp) + " " + "F"} </h2> 
       <img src = {iconApi} width = "100" height = 
                 "150"></img>
       <h5> {description}</h5>
       <p> Remove {name} from your favorites <span> <button type="button" onClick={(e) => removeFromeFavorites()}>
              {' '}
             <FaTrash/> </button> </span> </p>
                
              {inputFavoriteCityDeletedText && <p className = "removed-Fave-City-Text"> {name} has been removed from favorites</p>} 
    </div>
  </div>
</div>

      
        
//         <div className = "favoriteCityCards">

// <div  style={{ height: '10vh', width: '100%', color:"purple" }}>
//         <GoogleMapReact
//           bootstrapURLKeys={{ key:'AIzaSyA1HIKef045IgF-MDEbH5gQBqAbuLcdxzo' }}
//           zoom = {8}
//           center = {{lat:lat,lng:lon}}
//           hoverDistance= {15}
//         >
//           <AnyReactComponent
//             lat={lat}
//             lng={lon}
//             text={name}
//           />
//         </GoogleMapReact>
//       </div>

//             <h4> {name} <span> ({state})</span> </h4>
            
//             <h2> {round(temp) + " " + "F"} </h2>
//                 {/* <p> {wind + " " + "MPH"}</p> */}
               

//                 <img src = {iconApi} width = "100" height = 
//                 "150"></img>

// <h5> {description}</h5>
//          <p> Remove {name} from your favorites <span> <button type="button" onClick={(e) => removeFromeFavorites()}>
//               {' '}
//              <FaTrash/> </button> </span> </p>
                
//               {inputFavoriteCityDeletedText && <p className = "removed-Fave-City-Text"> {name} has been removed from favorites</p>} 
//         </div>
       
    )
}

export default CityComponent;
