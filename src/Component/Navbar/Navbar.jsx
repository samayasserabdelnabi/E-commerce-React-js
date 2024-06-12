import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { UserContext } from '../../ShareData/UserContext'
import { CartContext } from '../../ShareData/CartContext'
export default function Navbar() {
  let { userToken, setToken } = useContext(UserContext)
  let { numOfCartItems } = useContext(CartContext)
  let nag = useNavigate()
  function LogOut() {
    setToken(null)
    localStorage.removeItem("userToken")
    nag('/login')
  }
  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to='home'>
          <img src={logo} alt="" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userToken != null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink className="nav-link" to="home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/category">category</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/brands">brands</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">cart</NavLink>
            </li>


          </ul> : ""}


          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <a href='https://www.google.com'>   <i className='fa-brands mx-2 fa-facebook'></i></a>
              <i className='fa-brands mx-2 fa-instagram'></i>
              <i className='fa-brands mx-2 fa-youtube'></i>
              <i className='fa-brands mx-2 fa-twitter'></i>
              <i className='fa-brands mx-2 fa-spotify'></i>
            </li>
            {userToken != null ? <>


              <li className="nav-item">
                <NavLink to='/cart'>
                  <span className="nav-link cursor-pointer position-relative">
                    <i className='fa-solid fa-cart-shopping'></i>

                    <span className="position-absolute top-0 start-100 translate-middle p-2 text-main border border-light rounded-circle">
                      {numOfCartItems}
                    </span>
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <span className="nav-link cursor-pointer" onClick={LogOut} >Logout</span>
              </li>
            </> : <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Register</NavLink>
              </li>
            </>}





          </ul>
        </div>
      </div>
    </nav>
  )
}
