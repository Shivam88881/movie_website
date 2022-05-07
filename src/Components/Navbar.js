import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class Navbar extends Component {
  render() {
    return (
        <>
          <div className='navbar-main' >
            <nav className="navbar navbar-dark bg-dark">
              <div className='navigation'>
              <Link to='/movie_website' style={{textDecoration:'none'}}> <h2 style={{padding:'1rem',color:'#d46622'}}>Movies Website</h2></Link>
              <Link to='/movie_website/favourites' style={{textDecoration:'none'}}> <h3 style={{padding:'1rem',color:'#d46622'}}>Favroite</h3> </Link>
              </div>
            </nav>
          </div>
        </>
      
    )
  }
}
