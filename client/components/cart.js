import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {getCart} from '../store/cart'

class Cart extends Component {
  async componentDidMount() {
    await this.props.getUser()
    await this.props.getCart(this.props.user.id)
  }

  render() {
    const cart = this.props.cart
    return (
      <React.Fragment>
        <h1>Cart</h1>
        {cart ? (
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} {item.qty}
              </li>
            ))}
          </ul>
        ) : (
          'no items in cart'
        )}
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  cart: state.cart.cart,
  user: state.user
})

const mapDispatch = dispatch => ({
  getUser: () => dispatch(me()),
  getCart: userId => dispatch(getCart(userId))
})

export default connect(mapState, mapDispatch)(Cart)
