import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {gotSingle} from '../store/product'
import {incrementItemQty} from '../store/cart'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  async componentDidMount() {
    const id = this.props.match.params.id
    await this.props.getSingle(id)
    await this.props.getUser()
  }

  // this is working for items already in cart, need to write up backend to POST new item into cart if not already there
  async handleAddToCart(userId, productId) {
    await this.props.increment(userId, productId)
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
          <h3>${(product.price / 100).toFixed(2)}</h3>
          <h4>{product.description}</h4>
          <button
            type="button"
            onClick={() => this.handleAddToCart(user.id, product.id)}
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
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    getSingle: id => dispatch(gotSingle(id)),
    increment: (userId, productId) =>
      dispatch(incrementItemQty(userId, productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
