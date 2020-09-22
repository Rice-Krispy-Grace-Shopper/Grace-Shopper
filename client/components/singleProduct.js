import React from 'react'
import {connect} from 'react-redux'
import {gotSingle} from '../store/product'
import {Link, Switch} from 'react-router-dom'

export class SingleProduct extends React.Component {
  async componentDidMount() {
    await this.props.getSingle()
  }

  render() {}
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
