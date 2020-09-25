import React, {Component} from 'react'

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
      <div className="leftsidecart">
        <div className="paymentDIV">
          <form>
            <fieldset className="info">
              <h1>Payment Method</h1>
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
              <label>Expiration Date: (02/22)</label>
              <input
                className="input-adjust"
                type="text"
                id="address1"
                onChange={this.handleChange}
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
              <h1>Billing Information</h1>
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
            <h1>Shipping Information</h1>
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
        <input className="input-adjust" type="submit" value="Submit" />
      </div>
    )
  }
}