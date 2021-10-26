import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import FavoriteCityData from './favoriteCityData';


function App() {
  return (
    <BrowserRouter>
     <div className="App">
     <Route exact path = "/" component = {Home}/>
     <Route exact path = "/favorite" component = {FavoriteCityData}/>
      </div>
      </BrowserRouter>
  )
}

export default App;
