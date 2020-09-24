import React from 'react'
import {connect} from 'react-redux'
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
  }

  async handleAddToCart(userId, productId) {
    await this.props.increment(userId, productId)
    this.props.history.push('/cart')
  }

  render() {
    const product = this.props.product
    if (product) {
      return (
        <div>
          <h2>{product.name}</h2>
          <img src={product.imageUrl} width="200" height="200" />
          <h3>${(product.price / 100).toFixed(2)}</h3>
          <h4>{product.description}</h4>
          {/* button is working with userId is hard-coded -- need to address */}
          <button
            type="button"
            onClick={() => this.handleAddToCart(3, product.id)}
          >
            Add To Cart
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
    product: state.products.product
  }
}

const mapDispatch = dispatch => {
  return {
    getSingle: id => dispatch(gotSingle(id)),
    increment: (userId, productId) =>
      dispatch(incrementItemQty(userId, productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
