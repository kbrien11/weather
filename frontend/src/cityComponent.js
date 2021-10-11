import React from "react";



const CityComponent = ({name,state,temp,wind,description}) => {



    return (
        <div>

            <p> {"city" + ": "+name} </p>
            <p> {"state" + ": "+state} </p>
            <p> {"temp" + ": "+temp} </p>
                <p> {"wind" + ": "+wind}</p>
                <p> {"description" + ": "+description}</p>
               <hr></hr>
        </div>
    )
}

export default CityComponent;