import React, { useState } from 'react';
import './App.css';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Loader from 'react-loader-spinner';

require('react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css');

const App = () => {
  const [inputWeatherCondition, setInputWeatherCondition] = useState('');
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState('');
  const [isError, setIsError] = useState(false);
  const [noCitiesFound, setNoCitiesFound] = useState(false);

  const getWeather = async () => {
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
          `http://127.0.0.1:5000/api/${inputWeatherCondition}/`
        );
        const res = await response.json();
        console.log(res);
        if (res.data) {
          setCities(res.data);
          setLoading(false);
          setNoCitiesFound(true);
          setTimeout(noCityFoundTimeOut, 6000);
          console.log(res.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const noCityFoundTimeOut = () => {
    setNoCitiesFound(false);
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
      dataField: 1,
      text: 'Wind',
      sort: true
    },
    {
      dataField: 2,
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
          <button type="button" onClick={(e) => getWeather()}>
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
      {cities.length > 0 && (
        <div className="table-container">
          <div className="home-table">
            <h4> Incoming ({inputWeatherCondition}) data in the US</h4>
            <p>
              <BootstrapTable
                keyField="Name"
                data={cities}
                columns={columns}
                striped
                hover
                pagination={paginationFactory(options)}
              />{' '}
            </p>
          </div>
        </div>
      )}

      {cities.length > 0 && (
        <button>
          {' '}
          <button type="button" onClick={(e) => getWeather()}>
            more data
          </button>{' '}
        </button>
      )}

      {noCitiesFound && cities.length == 0 && (
        <p>
          {' '}
          There is no city in the US currently experiencing{' '}
          {inputWeatherCondition} at this moment{' '}
        </p>
      )}
      {isError && <p> Please input a valid weather condition</p>}
    </div>
  );
};

export default App;
