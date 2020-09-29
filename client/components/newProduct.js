import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addedProduct} from '../store/product'
import {me} from '../store/user'

class NewProduct extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getUser(this.props.match.params.id)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.description]: event.target.value,
      [event.target.image]: event.target.value,
      [event.target.price]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const name = event.target.name.value
    const description = event.target.description.value
    const image = event.target.image.value
    const price = event.target.price.value
    this.props.newProduct({name, description, image, price})
    //Need to fetch product id to pass in.
    // this.props.history.push(`/products/${this.props.product.id}`)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name of Product:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>

          <label>
            Description of Product:
            <input
              type="text"
              name="description"
              onChange={this.handleChange}
            />
          </label>

          <label>
            Price of Product:
            <input type="text" name="price" onChange={this.handleChange} />
          </label>

          <label>
            Image of Product:
            <input type="text" name="image" onChange={this.handleChange} />
          </label>
          <button type="submit">Submit New Product</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  newProduct: newItem => dispatch(addedProduct(newItem)),
  getUser: userId => dispatch(me(userId))
})

export default connect(null, mapDispatchToProps)(NewProduct)
