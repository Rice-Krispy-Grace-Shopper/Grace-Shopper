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
    return (
      <div className="OrderHistoryDiv">
        <h2>Order History</h2>
        {this.props.orders.length
          ? this.props.orders.map(order => {
              // calculate total for each order -- this is temporary solution
              // posting an order needs to be refactored later to just save this in the DB
              let total = 0
              order.contents.forEach(item => {
                total += item.qty * item.price
              })
              total = (total / 100).toFixed(2)

              return (
                <div key={order.id} className="SingleOrderDiv">
                  <h4>
                    Order placed on{' '}
                    {`${order.orderDate.slice(5, 10)}-${order.orderDate.slice(
                      0,
                      4
                    )}:`}
                  </h4>
                  {order.contents.map(orderItem => (
                    <div
                      key={orderItem.productId}
                      className="SingleOrderItemDiv"
                    >
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
                          ..... ${(orderItem.price / 100).toFixed(2)} (each)
                        </p>
                      </div>
                    </div>
                  ))}
                  <p>
                    <strong>Total:</strong> ${total}
                  </p>
                </div>
              )
            })
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
