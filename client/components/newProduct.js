import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addedProduct} from '../store/product'

class NewProduct extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {}

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.description]: event.target.value,
      [event.target.image]: event.target.value,
      [event.target.price]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const name = event.target.name.value
    const description = event.target.description.value
    const image = event.target.image.value
    const price = event.target.price.value

    await this.props.newProduct({name, description, image, price})
    this.props.history.push(`/products/${this.props.addedProduct.id}`)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="NewProductForm">
        <label>
          Product Name:
          <input type="text" name="name" onChange={this.handleChange} />
        </label>

        <label>
          Description:
          <input type="text" name="description" onChange={this.handleChange} />
        </label>

        <label>
          Price:
          <input type="text" name="price" onChange={this.handleChange} />
        </label>

        <label>
          Image URL:
          <input type="text" name="image" onChange={this.handleChange} />
        </label>
        <button type="submit" className="NewProductFormSubmitBtn">
          Submit
        </button>
      </form>
    )
  }
}

const mapState = state => ({
  addedProduct: state.products.product
})

const mapDispatchToProps = dispatch => ({
  newProduct: newItem => dispatch(addedProduct(newItem))
})

export default connect(mapState, mapDispatchToProps)(NewProduct)
