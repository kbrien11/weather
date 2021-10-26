import React from 'react'
import {Link as RouterLink} from 'react-router-dom'


const Navbar = () => {
    return(
        <div className = 'navbar'>

            <ul>



<a   href= '/'as ={RouterLink}> Home  </a>

<a  href= '/favorite'as ={RouterLink}> Favorites </a>

</ul>
        </div>
    )
}

export default Navbar
