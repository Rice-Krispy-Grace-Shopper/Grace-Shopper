import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotProducts} from '../store/product'
import {me} from '../store/user'

class NewProduct extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getUser(this.props.user.id)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const nameOfProduct = event.target.name.value
    const description = event.target.description.value
    const imageOfProduct = event.target.imageUrl.value
    const price = event.target.price.value
    this.props.newProduct({
      name: nameOfProduct,
      description,
      price,
      image: imageOfProduct
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name of Product:
            <input
              type="text"
              name="nameOfProduct"
              onChange={this.handleChange}
            />
          </label>

          <label>
            Description of Product:
            <input
              type="text"
              name="descriptionOfProduct"
              onChange={this.handleChange}
            />
          </label>

          <label>
            Price of Product:
            <input
              type="text"
              name="priceOfProduct"
              onChange={this.handleChange}
            />
          </label>

          <label>
            Image of Product:
            <input
              type="text"
              name="imageOfProduct"
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Submit New Product</button>
        </form>
      </div>
    )
  }
}

const mapToState = state => ({
  product: state.product,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  newProduct: product => dispatch(gotProducts(product)),
  getUser: userId => dispatch(me(userId))
})

export default connect(null, mapDispatchToProps)(NewProduct)
