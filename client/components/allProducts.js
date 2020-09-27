import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {gotProducts} from '../store/product'
import {Link} from 'react-router-dom'
import {getCart, incrementItemQty, addToCart} from '../store/cart'
import {addToGuestCart, incrementItemQtyGuest} from '../store/cart-guest'

export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  async componentDidMount() {
    await this.props.getProducts()
    await this.props.getUser()
    if (this.props.user.id) await this.props.getCart(this.props.user.id) // for logged in user
  }

  async handleAddToCart(userId, productId) {
    // for guest
    if (!this.props.user.id) {
      let itemIdxInCart = this.props.guestCart.findIndex(
        item => item.id === productId
      )
      if (itemIdxInCart === -1) await this.props.addToGuestCart(productId)
      itemIdxInCart = this.props.guestCart.findIndex(
        item => item.id === productId
      ) // re-assign after adding to cart
      this.props.incrementGuest(this.props.guestCart[itemIdxInCart])
    } else {
      // for logged in user
      const itemIdxInCart = this.props.cart.findIndex(
        item => item.id === productId
      )
      if (itemIdxInCart === -1) await this.props.addToCart(userId, productId)
      await this.props.increment(userId, productId)
    }
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
              <div key={product.id} className="AllProductsSingleDiv">
                <div className="AllProductsSingleImage">
                  <img src={product.imageUrl} width="150" height="150" />
                </div>
                <div className="AllProductsSingleContent">
                  <Link to={`/products/${product.id}`}>
                    <h2>{product.name}</h2>
                  </Link>
                  <h4>Price: ${(product.price / 100).toFixed(2)}</h4>
                  <h4>Description: {product.description}</h4>
                  <button
                    type="button"
                    onClick={() => this.handleAddToCart(user.id, product.id)}
                    className="AddToCartBtn"
                  >
                    Add to Cart
                  </button>
                </div>
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
    user: state.user,
    cart: state.cart.cart,
    guestCart: state.guestCart
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    getCart: userId => dispatch(getCart(userId)),
    getProducts: () => dispatch(gotProducts()),
    addToCart: (userId, productId) => dispatch(addToCart(userId, productId)),
    addToGuestCart: productId => dispatch(addToGuestCart(productId)),
    increment: (userId, productId) =>
      dispatch(incrementItemQty(userId, productId)),
    incrementGuest: product => dispatch(incrementItemQtyGuest(product))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
