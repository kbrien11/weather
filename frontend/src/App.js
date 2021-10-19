import React, { useState,useEffect } from 'react';
import './App.css';
import { FaSearch, FaSpinner, FaSun, FaCloudSunRain, FaCloud,FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Loader from 'react-loader-spinner';
import GoogleMapReact from 'google-map-react';
import CityComponent from './cityComponent'

require('react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css');

const App = () => {
  const [inputWeatherCondition, setInputWeatherCondition] = useState('');
  const [inputCity, setInputCity] = useState('');
  const [inputFavorite, setFavorite] = useState('');
  const [inputState, setInputState] = useState('');
  const [lat,setLatitude] = useState('');
  const [lon, setLongtide] = useState('');
  const [inputIcon, setIcon] = useState('');
  const [cities, setCities] = useState([]);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [position, setPosition] = useState({
    lat: lat, 
    lng: lon
});
  const [loading, setLoading] = useState('');
  const [isError, setIsError] = useState(false);
  const [noCitiesFound, setNoCitiesFound] = useState(false);
  const [inputShowForm, setShowForm] = useState(false);
  const [inputShowFavoriteCities, setShowFavoriteCities] = useState(false);
  const [inputUpdateForm, setUpdateForm] = useState(false);
  const [inputCityAddedText, setInputCityAddedTest] = useState(false);
  const[inputCityUpdatedText, setInputCityUpdatedText] = useState(false);
  const[inputaddToFavoriteText, setaddToFavoriteText] = useState(false);
  const [inputCityExistsError, setCityExistError] = useState(false);
  const [inputCityDeletedText, setCityDeletedText] = useState(false);
  const [token, setToken] = useState(false)

  useEffect(() => {getFavoriteCityData()},[])
  useEffect(() => {getCityFromLongAndLat()},[lat,lon])
  

  const deleteCity = async () => {
    const endpoint = `http://localhost:8080/cities/${token}`

    const data = {
      id: token
    }

    const configs = {
      method: "POST",
      mode: 'cors',
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "GET, PUT, POST, DELETE,OPTIONS", 'Accept': 'application/json' },
      body: JSON.stringify(data)


    }

    const response = await fetch(endpoint, configs);
    console.log(response)
    const res = response.text
    if (response.status === 200) {
      console.log(res)
      setCityDeletedText(true)
      setTimeout(CityDeletedTimeOut, 5000)

    }
    else {
      setCityExistError(true)
    }
  }


  const showForm = () => {
    setShowForm(true)
  }

  const showUpdateForm = () => {
    setUpdateForm(true)
  }

  const sendFormData = async () => {
    setIsError(false)
    const endpoint = "http://localhost:8080/cities"
    const data = {
      city: inputCity,
      state: inputState
    }

    const configs = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", 'Accept': 'application/json' },
      body: JSON.stringify(data)
    }

    const response = await fetch(endpoint, configs);
    console.log(response)
    const res = response.json
    if (response.status === 200) {
      console.log(res)
      setInputCityAddedTest(true)
      setTimeout(CityAddedTimeOut, 5000)
      
    }
    else {
      setCityExistError(true)
    }
  }

  const addToFavorites = async () => {
    setIsError(false)
    const endpoint = "http://localhost:8080/cities/update"
    const data = {
      id:token,
      city: inputCity,
      state: inputState,
      favorite:1
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
      setaddToFavoriteText(true)
      setTimeout(cityaddedToFavoriteTimeOut, 5000)
      
    }
    else {
      setCityExistError(true)
    }
  }


  




  const sendUpdatedData = async () => {
    setIsError(false)
    const endpoint = "http://localhost:8080/cities/update"
    const data = {
      id:token,
      city: inputCity,
      state: inputState,
      favorite:inputFavorite
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
      setInputCityUpdatedText(true)
      setTimeout(CityUpdatedTimeOut, 5000)
     
    }
    else {
      setCityExistError(true)
    }
  }


  
console.log(inputCity)
console.log(inputState)


const getFavoriteCityData = async () =>{
  try{
    const response = await fetch(
      "http://localhost:8080/cities/favorite"
    );
    const res = await response.json()
        console.log(res)
    if (res.length>0){
      setShowFavoriteCities(true)
      setFavoriteCities(res)
     setCities([])
    }
    else{
      console.log("no foavirte data")
    }
  } catch(error) {
   console.log(error)
  }
}

console.log(favoriteCities)

  const getWeatherFromCity = async () => {
    try {
      setIsError(false);
      setLoading(true);
      setNoCitiesFound(false);
      setCities([]);
      if (inputWeatherCondition == '') {
        setIsError(true);
        setLoading(false);
        setTimeout(setErrorTimeout, 4000);
      } else {
        const response = await fetch(
          `http://localhost:8080/${inputWeatherCondition}`
        );
        const res = await response.json();
        console.log(response[0])
        console.log(res);
        if (res.length > 0) {
          setShowFavoriteCities(false)
          setCities(res);
          setToken(res[0])
          setFavorite(res[3])
          setInputState(res[2])
          setIcon(res[7])
          setInputCity(res[1])
          setLoading(false);

          console.log(res.data);
        }
        else {
          setNoCitiesFound(true)
          setLoading(false)
          setTimeout(noCityFoundTimeOut, 6000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  const getWeatherFromLonandLat = async (name) => {
    try {
        const endpoint = `http://localhost:8080/${name}`
        const response = await fetch(
          endpoint
        );
        console.log(response)
        const res = await response.json();
        console.log(response[0])
        console.log(res);
        if (res.length > 0) {
          setShowFavoriteCities(false)
          setCities(res);
          setToken(res[0])
          setFavorite(res[3])
          setInputState(res[2])
          setIcon(res[7])
          setInputCity(res[1])
          setLoading(false);

          console.log(res.data);
        }
        else {
          setNoCitiesFound(true)
          setLoading(false)
          setTimeout(noCityFoundTimeOut, 6000);
        }
      }catch (error) {
        console.log(error);
      }
  
  };

  const getCityFromLongAndLat = async () =>{
  
    const configs = {
      method: "GET"
     
    }
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude)
      setLongtide(position.coords.longitude)
     
  })

    console.log(position)

      console.log(lat)
      console.log(lon)
      const endpoint = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=27b3ec19c7d34c1bcca082098b7a60a7`;
    
      const response = await fetch(endpoint,configs)
      const datas = await response.json();
      console.log(datas)
      if(response.status ===200){
       
        console.log(datas['name'])
        getWeatherFromLonandLat(datas['name'])
      }
          else{
            console.log( "error grabbing city name")
          }
    } 
  

  const iconApi = ('http://openweathermap.org/img/w/' + inputIcon + '.png')

 
  const cityObj = Object.assign({}, cities)
  console.log(token)
  function round(num) {
    return Math.ceil(num)
  }




console.log(inputWeatherCondition)
  const favoriteData = favoriteCities.map((city) => {
    return <CityComponent
      id = {city[0]}
      name={city[1]}
      state ={city[2]}
      temp = {city[4]}
      wind = {city[5]}
      description ={city[6]}
      icon = {city[7]}
    />
  })


  const AnyReactComponent = ({ text }) => <div>{text}</div>;


  const noCityFoundTimeOut = () => {
    setNoCitiesFound(false);
  };

  const cityaddedToFavoriteTimeOut = () => {
    setaddToFavoriteText(false);
  };

  const CityUpdatedTimeOut = () => {
    setInputCityUpdatedText(false);
  };

  const CityAddedTimeOut = () => {
    setInputCityAddedTest(false);
  };

  const CityDeletedTimeOut = () => {
    setCityDeletedText(false);
  };

  const setErrorTimeout = () => {
    setIsError(false);
  };

  const options = {
    page: 1,
    sizePerPage: 5,
    nextPageText: '>',
    prePageText: '<',
    showTotal: true
  };

  const columns = [
    {
      dataField: 0,
      text: 'City',
      sort: true
    },
    {
      dataField: 2,
      text: 'Wind',
      sort: true
    },
    {
      dataField: 1,
      text: 'Temp',
      sort: true
    },
    { dataField: 3, text: 'Description' }
  ];

  return (
    <div>

    
      <div className="searchBar">
        <input
          type="text"
          placeholder="Weather"
          onChange={(e) => setInputWeatherCondition(e.target.value)}
        />
        <span className="searchButton">
          <button type="button" onClick={(e) => getWeatherFromCity()}>
            {' '}
            <FaSearch />
          </button>{' '}
        </span>
        {loading ? (
          <div>
            <Loader
              type="Grid"
              color="green"
              height={80}
              width={80}
              secondaryColor="grey"
            />
            <div className="loading">
              <p>loading</p>
            </div>
          </div>
        ) : (
          ' '
        )}
      </div>

      <button classname = "home-button" type="button" onClick={(e) => getFavoriteCityData()}>
              {' '}
              Show favorite cities
            </button>{' '}

            {inputShowFavoriteCities &&<p> List of favorite cities ({favoriteData.length}) </p> }
      {inputShowFavoriteCities &&  <div className = "favoriteCityWrapper">
 
  

    { favoriteData}   

   

</div> }
<div className = "gridWrapper">
<div className = 'googleMapGrid'>
      {cities.length > 0 && (

        <div className = 'gridLoadCity'>
        <div className="homeCityWrapper">
          <div className="favoriteCityCard">

         
            {/* <h4> Current {inputWeatherCondition} weather</h4> */}

            <h4> {cityObj[1]} <span>({cityObj[2]})</span> </h4>
          
            <h2>{round(cityObj[4]) + " " + " " + "F"} </h2>
            {/* <p> Wind: {round(cityObj[5]) + " " + "MPH"}</p> */}
            <p> Description: {cityObj[6]}</p>
            <img src = {iconApi} width = "100" height = 
                "150"></img>
           

         
            {/* <p>
              <BootstrapTable
                keyField="Name"
                data={cities}
                columns={columns}
                striped
                hover
                pagination={paginationFactory(options)}
              />{' '}
            </p> */}

            <div className = "button-wrapper">
            <button classname = "home-button" type="button" onClick={(e) => showForm()}>
              {' '}
              Add New City
            </button>{' '}

            <button classname = "home-button" type="button" onClick={(e) => showUpdateForm()}>
              {' '}
              Update {inputWeatherCondition}
            </button>{' '}

            <button classname = "home-button" type="button" onClick={(e) => addToFavorites()}>
              {' '}
              Add To Favorites
            </button>{' '}
            </div>
            <p> If you would like to delete the {inputWeatherCondition} from the DB, please click here <span> <button type="button" onClick={(e) => deleteCity()}>
              {' '}
             <FaTrash/> </button> </span> </p>

          
            <div>
              {inputShowForm && (
                <div>
                  <input
                    type="text"
                    placeholder="City"
                    onChange={(e) => setInputCity(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="State"
                    onChange={(e) => setInputState(e.target.value)}
                  />
                  <button type="button" onClick={(e) => sendFormData()}>
                    {' '}
                    Send Data
                  </button>{' '}
                  {inputCityAddedText && <p> City and State added Succesfully!!</p>}
                </div>
              )}


            </div>


            <div>
              {inputUpdateForm && (
                <div>

                  <input
                    type="text"
                    placeholder={ cityObj[1]}
                    onChange={(e) => setInputCity(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder={ cityObj[2]}
                    onChange={(e) => setInputState(e.target.value)}
                  />
                  <button classname = "home-button" type="button" onClick={(e) => sendUpdatedData()}>
                    {' '}
                    Udpdate {inputWeatherCondition}
                  </button>{' '}
                  {inputCityUpdatedText && <p> {inputWeatherCondition} has been updated!!</p>}


                </div>


              )}


            </div>
          </div>
        </div>
        </div>
      )}

            {inputaddToFavoriteText && <p> City added to favorites!!</p>}
      {noCitiesFound && cities.length == 0 && (
        <p>
          {' '}

          {inputWeatherCondition} doesn't exist in the DB yet{' '}
        </p>
      )}
      {isError && <p> Please input a valid city</p>}
      {inputCityExistsError && <p> City already exstis</p>}
      {inputCityDeletedText && <p> {inputWeatherCondition} deleted from DB</p>}

      <div classname = "googleMap" style={{ height: '70vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:'GOOGLE_API_KEY' }}
          zoom = {8}
          center = {{lat:lat,lng:lon}}
        >
          <AnyReactComponent
            lat={lat}
            lng={lon}
            text={inputCity}
          />
        </GoogleMapReact>
      </div>
      </div>
      </div>
    </div>

  
  );
};

export default App;
