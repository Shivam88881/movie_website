import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class Navbar extends Component {
  render() {
    return (
        <>
          <nav className="navbar navbar-dark bg-dark">
            <div class='navbar'>
            <Link to='/movie_website' style={{textDecoration:'none'}}> <h2>Movies Website</h2></Link>
            <Link to='/movie_website/favourites' style={{textDecoration:'none'}}> <h3 style={{marginLeft:'2rem'}}>Favroite</h3> </Link>
            </div>
          </nav>
        </>
      
    )
  }
}
