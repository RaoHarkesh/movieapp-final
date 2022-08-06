import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Navbar extends Component {
  render() {
    return (
     
      <div className='navbar'>
        {/* <h1 className='navcomp'>Movies4u</h1>
      <h1 className='navcomp'>Favourites</h1> */}
      <Link to='/' style={{textDecoration:"none"}}><h1 className='navcomp1'>Movies4u</h1></Link>
      <Link to='/favourites' style={{textDecoration:"none"}}><h1 className='navcomp2'>Favourites</h1></Link>
      </div>
      

      
    )
  }
}
