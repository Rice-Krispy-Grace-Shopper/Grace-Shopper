import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {me} from '../store/user'
import {
  getCart,
  incrementItemQty,
  decrementItemQty,
  deleteFromCart,
  getSubtotal
} from '../store/cart'
import {
  incrementItemQtyGuest,
  decrementItemQtyGuest,
  deleteItemGuestCart
} from '../store/cart-guest'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
    this.handleDeleteItem = this.handleDeleteItem.bind(this)
  }

  async componentDidMount() {
    await this.props.getUser()
    // for logged in user
    if (this.props.user.id) {
      await this.props.getCart(this.props.user.id)
      this.props.getSubtotal()
    }
  }

  async handleIncrement(userId, productId) {
    // for guest:
    if (!this.props.user.id) {
      const guestCartItem = this.props.guestCart.find(
        item => item.id === productId
      )
      this.props.incrementGuest(guestCartItem)
    } else {
      // for logged in user:
      await this.props.increment(userId, productId)
      await this.props.getCart(this.props.user.id)
      this.props.getSubtotal()
    }
  }

  async handleDecrement(userId, productId) {
    // for guest
    if (!this.props.user.id) {
      const guestCartItem = this.props.guestCart.find(
        item => item.id === productId
      )
      if (guestCartItem.qty > 1) this.props.decrementGuest(guestCartItem)
      if (guestCartItem.qty <= 1) this.props.deleteItemGuest(guestCartItem)
    } else {
      // for logged in user:
      const item = this.props.cart.find(item => item.id === productId)
      if (item.qty === 1) await this.props.deleteItem(userId, productId)
      else await this.props.decrement(userId, productId)
      await this.props.getCart(this.props.user.id)
      this.props.getSubtotal()
    }
  }

  async handleDeleteItem(userId, productId) {
    // for guest
    if (!this.props.user.id) {
      const guestCartItem = this.props.guestCart.find(
        item => item.id === productId
      )
      this.props.deleteItemGuest(guestCartItem)
    } else {
      // for logged in user:
      await this.props.deleteItem(userId, productId)
      await this.props.getCart(this.props.user.id)
      this.props.getSubtotal()
    }
  }

  render() {
    console.log('state in cart-->', this.props)

    const user = this.props.user

    let cart
    if (!user.id) cart = this.props.guestCart
    else cart = this.props.cart

    return (
      <React.Fragment>
        {cart ? (
          <div className="CartContents">
            {cart.length ? (
              <React.Fragment>
                {cart.map(item => (
                  <div key={item.id} className="CartItem">
                    <div>
                      <Link to={`/products/${item.id}`}>
                        <img
                          src={item.imageUrl}
                          width="100"
                          height="100"
                          className="AllProductsSingleImage"
                        />
                      </Link>
                    </div>
                    <div className="AllProductsSingleContent">
                      <Link to={`/products/${item.id}`}>
                        <h3 className="AllProductsSingleName">{item.name}</h3>
                      </Link>
                      <p>
                        <strong>Price:</strong> ${(item.price / 100).toFixed(2)}
                      </p>
                      <p>
                        <strong>Description:</strong> {item.description}
                      </p>
                    </div>
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
                ))}
                {/* CHECKOUT SECTION */}
                <div className="CartCheckoutSection">
                  <p className="CartSubtotal">
                    <strong>Subtotal:</strong> ${user.id
                      ? (this.props.subtotal / 100).toFixed(2)
                      : 'guest subtotal'}
                  </p>
                  <button type="button" className="CartCheckoutBtn">
                    Checkout
                  </button>
                </div>
              </React.Fragment>
            ) : (
              'Your Cart Is Empty'
            )}
          </div>
        ) : (
          // this is for when no user is logged in if not cart exists at all
          'Your Cart Is Empty'
        )}
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  cart: state.cart.cart,
  subtotal: state.cart.subtotal,
  user: state.user,
  guestCart: state.guestCart
})

const mapDispatch = dispatch => ({
  getUser: () => dispatch(me()),
  getCart: userId => dispatch(getCart(userId)),
  increment: (userId, productId) =>
    dispatch(incrementItemQty(userId, productId)),
  decrement: (userId, productId) =>
    dispatch(decrementItemQty(userId, productId)),
  deleteItem: (userId, productId) =>
    dispatch(deleteFromCart(userId, productId)),
  incrementGuest: product => dispatch(incrementItemQtyGuest(product)),
  decrementGuest: product => dispatch(decrementItemQtyGuest(product)),
  deleteItemGuest: product => dispatch(deleteItemGuestCart(product)),
  getSubtotal: () => dispatch(getSubtotal())
})

export default connect(mapState, mapDispatch)(Cart)
