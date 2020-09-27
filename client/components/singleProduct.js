import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {gotSingle} from '../store/product'
import {getCart, incrementItemQty, addToCart} from '../store/cart'
import {addToGuestCart, incrementItemQtyGuest} from '../store/cart-guest'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  async componentDidMount() {
    const id = this.props.match.params.id
    await this.props.getSingle(id)
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
    const product = this.props.product
    const user = this.props.user

    if (product) {
      return (
        <div>
          <h2>{product.name}</h2>
          <img src={product.imageUrl} width="200" height="200" />
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
      )
    } else {
      return <div />
    }
  }
}

const mapState = state => {
  return {
    product: state.products.product,
    user: state.user,
    cart: state.cart.cart,
    guestCart: state.guestCart
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    getCart: userId => dispatch(getCart(userId)),
    getSingle: id => dispatch(gotSingle(id)),
    addToCart: (userId, productId) => dispatch(addToCart(userId, productId)),
    addToGuestCart: productId => dispatch(addToGuestCart(productId)),
    increment: (userId, productId) =>
      dispatch(incrementItemQty(userId, productId)),
    incrementGuest: product => dispatch(incrementItemQtyGuest(product))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
