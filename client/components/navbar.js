import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1 className="Logo">Grace Shopper</h1>
    <nav>
      {isLoggedIn ? (
        <div className="NavBarDiv">
          {/* The navbar will show these links after you log in */}
          <div className="NavBarLeft">
            <NavLink to="/home" activeClassName="NavActive">
              Home
            </NavLink>
            <NavLink to="/products" activeClassName="NavActive">
              Shop
            </NavLink>
            <NavLink to="/cart" activeClassName="NavActive">
              Cart
            </NavLink>
          </div>
          <div className="NavBarRight">
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div className="NavBarDiv">
          {/* The navbar will show these links before you log in */}
          <div className="NavBarLeft">
            <NavLink to="/products" activeClassName="NavActive">
              Shop
            </NavLink>
            <NavLink to="/cart" activeClassName="NavActive">
              Cart
            </NavLink>
          </div>
          <div className="NavBarRight">
            <NavLink to="/login" activeClassName="NavActive">
              Login
            </NavLink>
            <NavLink to="/signup" activeClassName="NavActive">
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
