import React, { useState,useEffect } from 'react';
import './App.css';
import { FaSearch, FaSpinner, FaSun, FaCloudSunRain, FaCloud,FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Loader from 'react-loader-spinner';
import CityComponent from './cityComponent'

require('react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css');

const App = () => {
  const [inputWeatherCondition, setInputWeatherCondition] = useState('');
  const [inputCity, setInputCity] = useState('');
  const [inputFavorite, setFavorite] = useState('');
  const [inputState, setInputState] = useState('');
  const [cities, setCities] = useState([]);
  const [favoriteCities, setFavoriteCities] = useState([]);
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
      setInputState("")
      setInputCity("")
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
      setInputState("")
      setInputCity("")
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
      setInputState("")
      setInputCity("")
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
          setInputState(res[2])
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

  const cityObj = Object.assign({}, cities)
  console.log(token)
  function round(num) {
    return Math.ceil(num)
  }

  function suggestion() {
    if (cityObj[1] > 65) {

      <p> <FaSun></FaSun></p>
      return " You should go play outside"
    }
    if (cityObj[1] > 50 || cityObj[1] <= 65) {
      <p> <FaCloud></FaCloud></p>
      return " You should go play outside but wear a sweater"
    }
    else {
      return "You should stay inside"
    }
  }

  console.log(typeof (cityObj[2]))

  const favoriteData = favoriteCities.map((city) => {
    return <CityComponent

      name={city[1]}
      state ={city[2]}
      temp = {city[4]}
      wind = {city[5]}
      description ={city[6]}
    />
  })



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

      {inputShowFavoriteCities &&  <div className = "favoriteCityData">
 
  <p> List of favorite cities ({favoriteData.length}) </p>
  <hr></hr>
       { favoriteData} 

</div> }
      {cities.length > 0 && (
        <div className="table-container">
          <div className="home-table">
            <h4> Incoming ({inputWeatherCondition}) data in the US</h4>

            <p> city: {cityObj[1]} </p>
            <p> State: {cityObj[2]}</p>
            <p> Temp: {round(cityObj[4]) + " " + " " + "F"} <span> <FaCloud></FaCloud></span></p>
            <p> Wind: {round(cityObj[5]) + " " + "MPH"}</p>
            <p> Description: {cityObj[6]}</p>
            <p>{suggestion()}</p>

            <p> If you would like to delete the {inputWeatherCondition} from the DB, please click here <span> <button type="button" onClick={(e) => deleteCity()}>
              {' '}
             <FaTrash/> </button> </span> </p>
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
            <button type="button" onClick={(e) => showForm()}>
              {' '}
              Add New City
            </button>{' '}

            <button type="button" onClick={(e) => showUpdateForm()}>
              {' '}
              Update {inputWeatherCondition}
            </button>{' '}

            <button type="button" onClick={(e) => addToFavorites()}>
              {' '}
              Add To Favorites
            </button>{' '}
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
                  <button type="button" onClick={(e) => sendUpdatedData()}>
                    {' '}
                    Udpdate {inputWeatherCondition}
                  </button>{' '}
                  {inputCityUpdatedText && <p> {inputWeatherCondition} has been updated!!</p>}


                </div>


              )}


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
    </div>
  );
};

export default App;
