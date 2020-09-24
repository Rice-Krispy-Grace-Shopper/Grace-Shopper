import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {
  getCart,
  incrementItemQty,
  decrementItemQty,
  deleteFromCart
} from '../store/cart'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
    this.handleDeleteItem = this.handleDeleteItem.bind(this)
  }

  async componentDidMount() {
    await this.props.getUser()
    await this.props.getCart(this.props.user.id)
  }

  async handleIncrement(userId, productId) {
    await this.props.increment(userId, productId)
    await this.props.getCart(this.props.user.id)
  }

  async handleDecrement(userId, productId) {
    await this.props.decrement(userId, productId)
    await this.props.getCart(this.props.user.id)
  }

  async handleDeleteItem(userId, productId) {
    await this.props.deleteItem(userId, productId)
    await this.props.getCart(this.props.user.id)
  }

  render() {
    const cart = this.props.cart
    const user = this.props.user

    return (
      <React.Fragment>
        <h1>Cart</h1>
        {cart ? (
          <div className="CartContents">
            {cart.length
              ? cart.map(item => (
                  <div key={item.id} className="CartItem">
                    {item.name}
                    <div className="CartItemEditDiv">
                      <button
                        type="button"
                        onClick={() => this.handleDecrement(user.id, item.id)}
                        className="CartDecrement"
                      >
                        -
                      </button>
                      <div className="CartItemQty">{item.qty}</div>
                      <button
                        type="button"
                        onClick={() => this.handleIncrement(user.id, item.id)}
                        className="CartIncrement"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => this.handleDeleteItem(user.id, item.id)}
                        className="CartRemoveItem"
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                ))
              : 'no items in cart'}
          </div>
        ) : (
          'this should never render -- may be able to remove conditional -- thoroughly check for errors if removed, may require some debugging to remove'
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
  getCart: userId => dispatch(getCart(userId)),
  increment: (userId, productId) =>
    dispatch(incrementItemQty(userId, productId)),
  decrement: (userId, productId) =>
    dispatch(decrementItemQty(userId, productId)),
  deleteItem: (userId, productId) => dispatch(deleteFromCart(userId, productId))
})

export default connect(mapState, mapDispatch)(Cart)
