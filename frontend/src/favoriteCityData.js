import React, { useState, useEffect } from 'react';
import CityComponent from './cityComponent'
import Navbar  from './navbar';



const FavoriteCityData = () => {
    const [favoriteCities, setFavoriteCities] = useState([]);
    const [inputShowFavoriteCities, setShowFavoriteCities] = useState(false);
    const [cities, setCities] = useState([]);

    useEffect(() => {getFavoriteCityData()},[])


    const getFavoriteCityData = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/cities/favorite"
            );
            const res = await response.json()
            console.log(res)
            if (res.length > 0) {
                setShowFavoriteCities(true)
                setFavoriteCities(res)
                setCities([])
            }
            else {
                console.log("no foavirte data")
            }
        } catch (error) {
            console.log(error)
        }
    }


    const favoriteData = favoriteCities.map((city) => {
        return <CityComponent
            id={city[0]}
            name={city[1]}
            state={city[2]}
            temp={city[4]}
            wind={city[5]}
            description={city[6]}
            icon={city[7]}
        />
    })

    return (
        <div>
             <Navbar />
            {inputShowFavoriteCities && <p className="face-city-length"> List of favorite cities ({favoriteData.length}) </p>}
            {inputShowFavoriteCities && <div className="favoriteCityWrapper">



                {favoriteData}



            </div>}
        </div>
    )



}

export default FavoriteCityData
