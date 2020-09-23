import React from 'react'
import {connect} from 'react-redux'
import {gotProducts} from '../store/product'
import {Link, Switch} from 'react-router-dom'

export class AllProducts extends React.Component {
  async componentDidMount() {
    await this.props.getProducts()
  }

  render() {
    const products = this.props.products
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
                <h4>{product.price}</h4>
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
    products: state.products.products
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(gotProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
