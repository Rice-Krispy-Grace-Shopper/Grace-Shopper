import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {getOrders} from '../store/order'

class OrderHistory extends Component {
  async componentDidMount() {
    await this.props.getUser()
    await this.props.getOrders(this.props.user.id)
  }

  render() {
    console.log('orders on state-->', this.props.orders)
    return (
      <div className="OrderHistoryDiv">
        <h2>Your Orders:</h2>
        {this.props.orders.length
          ? this.props.orders.map(order => (
              <div key={order.id} className="SingleOrderDiv">
                {order.contents.map(orderItem => (
                  <div key={orderItem.productId} className="SingleOrderItemDiv">
                    <h4>Order placed on {order.orderDate.slice(0, 10)}</h4>
                    <p>
                      <strong>Qty:</strong> {orderItem.qty}
                    </p>
                    <p>
                      <strong>Price:</strong> ${(orderItem.price / 100).toFixed(
                        2
                      )}
                    </p>
                  </div>
                ))}
              </div>
            ))
          : 'You do not have any orders!'}
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  orders: state.orders
})

const mapDispatch = dispatch => ({
  getUser: () => dispatch(me()),
  getOrders: userId => dispatch(getOrders(userId))
})

export default connect(mapState, mapDispatch)(OrderHistory)
