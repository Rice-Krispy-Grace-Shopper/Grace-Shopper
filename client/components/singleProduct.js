import React from 'react'
import {connect} from 'react-redux'
import {gotSingle} from '../store/product'
import {Link, Switch} from 'react-router-dom'

export class SingleProduct extends React.Component {
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
