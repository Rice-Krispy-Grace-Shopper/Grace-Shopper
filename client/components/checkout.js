import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      paymentInfo: ''
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  }
  render() {
    return (
      <React.Fragment>
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
        {/* leaving in existing submit as comment: */}
        {/* <input className="input-adjust" type="submit" value="Submit" /> */}

        {/* temporarily making Submit Order button a Link */}
        {/* should be refactored to a button and then handleSubmit will perform a history.push("/checkout-confirmation") */}
        <Link to="/checkout-confirmation" className="CheckoutSubmitBtn">
          Submit Order
        </Link>
      </React.Fragment>
    )
  }
}
