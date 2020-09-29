import React, {Component} from 'react'
import {connect} from 'react-redux'
import ls from 'local-storage'
import {me} from '../store/user'
import {submitOrder} from '../store/order'
import {clearCart, getCart, getSubtotal} from '../store/cart'
import {removedGuestCart} from '../store/cart-guest'

class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      paymentInfo: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    await this.props.getUser()

    // for logged in user
    if (this.props.user.id) {
      await this.props.getCart(this.props.user.id)
      this.props.getSubtotal()
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(userId, cart) {
    // event.preventDefault();
    // for logged in user:
    if (this.props.user.id) {
      await this.props.submitOrder(userId, cart)
      await this.props.clearCart(userId)
    } else {
      // for guest
      this.props.clearGuestCart()
    }
    this.props.history.push('/checkout-confirmation')
  }

  render() {
    console.log('state in checkout-->', this.props)

    // non-unique IDs are making browser complain
    // local state management for form inputs needs attention
    return (
      <React.Fragment>
        <div className="CheckoutReviewItemsDiv">
          <h3>Review Items</h3>
          {/* currently relying the fact that carts are on state because you always have to click into checkout page from the cart -- but this means that you cannot refresh the browser while checking out -- fetch the cart to fix later */}
          {this.props.user.id ? (
            <div className="CheckoutReviewItems">
              {/* for logged in user: */}
              {this.props.cart
                ? this.props.cart.map(item => (
                    <div key={item.id}>
                      <p>
                        ({item.qty}) {item.name} ... ${(
                          item.price / 100
                        ).toFixed(2)}{' '}
                        each
                      </p>
                    </div>
                  ))
                : 'No Items To Review'}
              <p>
                <strong>Total:</strong> ${(this.props.subtotal / 100).toFixed(
                  2
                )}
              </p>
            </div>
          ) : (
            <div className="CheckoutReviewItems">
              {/* for guest: */}
              {this.props.guestCartLocalStorage.map(item => (
                <div key={item.id}>
                  <p>
                    ({item.qty}) {item.name} ... ${(item.price / 100).toFixed(
                      2
                    )}{' '}
                    each
                  </p>
                </div>
              ))}
              <p>
                <strong>Total:</strong> ${(
                  this.props.guestCartLocalStorage.reduce((subtotal, item) => {
                    subtotal += item.price * item.qty
                    return subtotal
                  }, 0) / 100
                ).toFixed(2)}
              </p>
            </div>
          )}
        </div>
        <div className="leftsidecart CheckoutForm">
          <div className="paymentDIV">
            <form>
              <fieldset className="info">
                <h3>Payment Method</h3>
                <div className="dropdown">
                  <select name="paymentmethod" id="paymentmethod">
                    <option value="mastercard">Mastercard</option>
                    <option value="discover">Discover</option>
                    <option value="americanexpress">American Express</option>
                    <option value="applepay">Apple Pay</option>
                  </select>
                </div>
                <label htmlFor="firstname">Name on Card:</label>
                <input
                  className="input-adjust"
                  type="text"
                  id="firstname1"
                  onChange={this.handleChange}
                />
                <label>Credit Card Number:</label>
                <input
                  className="input-adjust"
                  type="text"
                  id="lastname1"
                  onChange={this.handleChange}
                />
                <label>Expiration Date:</label>
                <input
                  className="input-adjust"
                  type="text"
                  id="address1"
                  onChange={this.handleChange}
                  placeholder="2/23"
                />
                <label>Security Code:</label>
                <input
                  className="input-adjust"
                  type="text"
                  id="city1"
                  onChange={this.handleChange}
                />
              </fieldset>
            </form>
          </div>
          <div className="shippingInfo">
            <form>
              <fieldset className="info">
                <h3>Billing Information</h3>
                <label htmlFor="firstname">First Name:</label>
                <input
                  className="input-adjust"
                  type="text"
                  id="firstname1"
                  onChange={this.handleChange}
                />
                <label>Last Name:</label>
                <input
                  className="input-adjust"
                  type="text"
                  id="lastname1"
                  onChange={this.handleChange}
                />
                <label>Address:</label>
                <input
                  className="input-adjust"
                  type="text"
                  id="address1"
                  onChange={this.handleChange}
                />
                <label>City:</label>
                <input
                  className="input-adjust"
                  type="text"
                  id="city1"
                  onChange={this.handleChange}
                />
                <label>Country:</label>
                <input
                  className="input-adjust"
                  type="text"
                  id="country1"
                  onChange={this.handleChange}
                />
              </fieldset>
            </form>
          </div>
          <div className="checkoutInfo">
            <fieldset className="info">
              <h3>Shipping Information</h3>
              <label htmlFor="billing-info">Same as my Billing Address:</label>
              <input
                className="input-adjust"
                type="checkbox"
                id="billing-info"
                name="billing-info"
                onChange={this.handleChange}
              />
              <label>First Name:</label>
              <input
                className="input-adjust"
                type="text"
                id="firstname2"
                onChange={this.handleChange}
              />
              <label>Last Name:</label>
              <input
                className="input-adjust"
                type="text"
                id="lastname2"
                onChange={this.handleChange}
              />
              <label>Address:</label>
              <input
                className="input-adjust"
                type="text"
                id="address2"
                onChange={this.handleChange}
              />
              <label>City:</label>
              <input
                className="input-adjust"
                type="text"
                id="city2"
                onChange={this.handleChange}
              />
              <label>Country:</label>
              <input
                className="input-adjust"
                type="text"
                id="country2"
                onChange={this.handleChange}
              />
            </fieldset>
          </div>
        </div>
        {/* leaving in existing submit "button" as comment: */}
        {/* <input className="input-adjust" type="submit" value="Submit" /> */}

        {/* may want to refactor to button type submit once forms are ready to go */}
        <button
          type="button"
          onClick={() => this.handleSubmit(this.props.user.id, this.props.cart)}
          className="CheckoutSubmitBtn"
        >
          Submit Order
        </button>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  cart: state.cart.cart,
  subtotal: state.cart.subtotal,
  user: state.user,
  guestCart: state.guestCart,
  guestCartLocalStorage: ls.get('guestCart_')
})

const mapDispatch = dispatch => ({
  getUser: () => dispatch(me()),
  getCart: userId => dispatch(getCart(userId)),
  submitOrder: (userId, cart) => dispatch(submitOrder(userId, cart)),
  clearCart: userId => dispatch(clearCart(userId)),
  clearGuestCart: () => dispatch(removedGuestCart()),
  getSubtotal: () => dispatch(getSubtotal())
})

export default connect(mapState, mapDispatch)(Checkout)
