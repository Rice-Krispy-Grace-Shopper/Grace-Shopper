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
          <div className="CartContents">
            {cart.map(item => (
              <div key={item.id} className="CartItem">
                {item.name}
                <div className="CartItemEditDiv">
                  <button type="button">-</button>
                  <div className="CartItemQty">{item.qty}</div>
                  <button type="button">+</button>
                </div>
              </div>
            ))}
          </div>
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
