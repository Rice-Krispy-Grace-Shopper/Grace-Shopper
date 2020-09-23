import React from 'react'
import {connect} from 'react-redux'
import {gotSingle} from '../store/product'

export class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
    this.increment = this.increment.bind(this)
  }

  increment() {
    this.setState(prevState => ({
      count: prevState.count + 1
    }))
  }

  async componentDidMount() {
    const id = this.props.match.params.id
    await this.props.getSingle(id)
  }

  render() {
    const product = this.props.product
    if (product) {
      return (
        <div>
          <h2>{product.name}</h2>
          <img src={product.imageUrl} width="300" height="300" />
          <h3>${(product.price / 100).toFixed(2)}</h3>
          <h4>{product.description}</h4>
          <button
            type="button"
            onClick={
              () => this.increment()
              // cart.innerHTML (THIS WILL UPDATE CARTS QUANTITY) = this.state.count
            }
          >
            Add To Cart
          </button>
          <h4>Quantity Added to Cart: {this.state.count}</h4>
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
    getSingle: id => dispatch(gotSingle(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
