import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {me} from '../store/user'
import {gotProducts} from '../store/product'
import {getOrders} from '../store/order'

class OrderHistory extends Component {
  async componentDidMount() {
    await this.props.getUser()
    await this.props.getProducts()
    await this.props.getOrders(this.props.user.id)
  }

  render() {
    console.log('state-->', this.props)
    return (
      <div className="OrderHistoryDiv">
        <h2>Order History:</h2>
        {this.props.orders.length
          ? this.props.orders.map(order => (
              <div key={order.id} className="SingleOrderDiv">
                <h4>Order placed on {order.orderDate.slice(0, 10)}</h4>
                {order.contents.map(orderItem => (
                  <div key={orderItem.productId} className="SingleOrderItemDiv">
                    <div className="SingleOrderLineItem">
                      <p>
                        ({orderItem.qty}){' '}
                        <Link to={`/products/${orderItem.productId}`}>
                          {
                            this.props.products.find(
                              item => item.id === orderItem.productId
                            ).name
                          }
                        </Link>
                      </p>

                      <p>
                        <strong>Price:</strong> ${(
                          orderItem.price / 100
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
                <p>
                  <strong>Total:</strong>{' '}
                </p>
              </div>
            ))
          : 'You do not have any orders!'}
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products.products,
  user: state.user,
  orders: state.orders
})

const mapDispatch = dispatch => ({
  getUser: () => dispatch(me()),
  getProducts: () => dispatch(gotProducts()),
  getOrders: userId => dispatch(getOrders(userId))
})

export default connect(mapState, mapDispatch)(OrderHistory)
