import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {gotProducts} from '../store/product'
import {Link} from 'react-router-dom'
import {incrementItemQty} from '../store/cart'

export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  async componentDidMount() {
    await this.props.getProducts()
    await this.props.getUser()
  }

  // this is working for items already in cart, need to write up backend to POST new item into cart if not already there
  async handleAddToCart(userId, productId) {
    await this.props.increment(userId, productId)
    this.props.history.push('/cart')
  }

  render() {
    const products = this.props.products
    const user = this.props.user

    if (products) {
      return (
        <React.Fragment>
          {products.map(product => {
            return (
              <div key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img src={product.imageUrl} width="200" height="100" />
                  <h2>{product.name}</h2>
                </Link>
                <h4>${(product.price / 100).toFixed(2)}</h4>
                <button
                  type="button"
                  onClick={() => this.handleAddToCart(user.id, product.id)}
                >
                  Add to Cart
                </button>
              </div>
            )
          })}
        </React.Fragment>
      )
    } else {
      return 'No Products to Display!'
    }
  }
}

const mapState = state => {
  return {
    products: state.products.products,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    getProducts: () => dispatch(gotProducts()),
    increment: (userId, productId) =>
      dispatch(incrementItemQty(userId, productId))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
