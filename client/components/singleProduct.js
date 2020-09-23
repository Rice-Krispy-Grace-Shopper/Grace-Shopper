import React from 'react'
import {connect} from 'react-redux'
import {gotSingle} from '../store/product'
import {Link, Switch} from 'react-router-dom'

export class SingleProduct extends React.Component {
  async componentDidMount() {
    const id = this.props.match.id
    await this.props.getSingle()
  }

  render() {
    const product = this.props.product
    return (
      <div key={product.id}>
        <h2>{product.name}</h2>
        <img src={product.imageUrl} />
        <h3>{product.price}</h3>
        <h4>{product.description}</h4>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.product
  }
}

const mapDispatch = dispatch => {
  return {
    getSingle: (id = dispatch(gotSingle(id)))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
