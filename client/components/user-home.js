import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {saveGuestCart} from '../store/cart'
import {removedGuestCart} from '../store/cart-guest'
import ls from 'local-storage'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  async componentDidMount() {
    // currently, if a guest has items in a cart, if a user logs in, the guest items will overwrite the user's cart when logging in:
    if (
      this.props.guestCartLocalStorage &&
      this.props.guestCartLocalStorage.length
    ) {
      await this.props.saveGuestCart(
        this.props.user.id,
        this.props.guestCartLocalStorage
      )
    }
    await this.props.removeGuestCart()
  }

  render() {
    return (
      <div>
        <h3 className="WelcomeMsg">Welcome, {this.props.email}!</h3>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    user: state.user,
    guestCartLocalStorage: ls.get('guestCart_')
  }
}

const mapDispatch = dispatch => ({
  getUser: () => dispatch(me()),
  saveGuestCart: (userId, cart) => dispatch(saveGuestCart(userId, cart)),
  removeGuestCart: () => dispatch(removedGuestCart())
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
