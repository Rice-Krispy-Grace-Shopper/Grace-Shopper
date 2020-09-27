import React from 'react'
import {connect} from 'react-redux'

const CheckoutConfirmation = () => {
  return (
    <div className="CheckoutConfDiv">
      <h1>Thank You for Shopping with Us!</h1>
      <p>Your Breakfast is Inbound!</p>
      <img
        src="https://perfectpuree.com/wp-content/uploads/2018/08/truck_icon.jpg"
        alt="Cereal Being Shipped"
        width="300px"
        height="300px"
      />
    </div>
  )
}

export default connect(null)(CheckoutConfirmation)
