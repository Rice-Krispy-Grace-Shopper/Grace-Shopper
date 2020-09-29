import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {gotSingle, putProduct, destroyProduct} from '../store/product'
import {getCart, incrementItemQty, addToCart} from '../store/cart'
import {addToGuestCart, incrementItemQtyGuest} from '../store/cart-guest'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  async componentDidMount() {
    const id = this.props.match.params.id
    await this.props.getSingle(id)
    await this.props.getUser()
    if (this.props.user.id) await this.props.getCart(this.props.user.id) // for logged in user
  }

  async handleAddToCart(userId, productId) {
    // for guest
    if (!this.props.user.id) {
      let itemIdxInCart = this.props.guestCart.findIndex(
        item => item.id === productId
      )
      if (itemIdxInCart === -1) await this.props.addToGuestCart(productId)
      itemIdxInCart = this.props.guestCart.findIndex(
        item => item.id === productId
      ) // re-assign after adding to cart
      this.props.incrementGuest(this.props.guestCart[itemIdxInCart])
    } else {
      // for logged in user
      const itemIdxInCart = this.props.cart.findIndex(
        item => item.id === productId
      )
      if (itemIdxInCart === -1) await this.props.addToCart(userId, productId)
      await this.props.increment(userId, productId)
    }
    this.props.history.push('/cart')
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    this.props.addItem({
      price: this.props.product.price * 100,
      quantity: this.state.quantity,
      productId: this.props.product.id
    })
  }

  handleDelete = event => {
    event.preventDefault()
    this.props.deleteProduct(this.props.user.id)
  }

  handleUpdate = event => {
    event.preventDefault()
    const name = event.target.nameOfProduct.value
    const description = event.target.descriptionOfProduct.value
    const imageUrl = event.target.imageOfProduct.value
    const price = event.target.priceOfProduct.value
    const productId = this.props.match.params.id
    this.props.updateProduct(productId, {
      name,
      description,
      price,
      imageUrl
    })
  }

  render() {
    const product = this.props.product
    const user = this.props.user

    console.log('THIS IS OUR STATE', this.props)

    if (product) {
      return (
        <div>
          <h2>{product.name}</h2>
          <img src={product.imageUrl} width="200" height="200" />
          <p>
            <strong>Price:</strong> ${(product.price / 100).toFixed(2)}
          </p>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <button
            type="button"
            onClick={() => this.handleAddToCart(user.id, product.id)}
            className="AddToCartBtn"
          >
            Add to Cart
          </button>
          <div>
            <button
              type="button"
              className="remove-product"
              onClick={this.handleDelete}
            >
              Delete {product.name}
            </button>
          </div>
          <div />
          <div>
            <h1>Update {product.name}'s Information</h1>
            <div>
              <form onSubmit={this.handleUpdate}>
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
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
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
    user: state.user,
    cart: state.cart.cart,
    guestCart: state.guestCart
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    getCart: userId => dispatch(getCart(userId)),
    getSingle: id => dispatch(gotSingle(id)),
    addToCart: (userId, productId) => dispatch(addToCart(userId, productId)),
    addToGuestCart: productId => dispatch(addToGuestCart(productId)),
    increment: (userId, productId) =>
      dispatch(incrementItemQty(userId, productId)),
    incrementGuest: product => dispatch(incrementItemQtyGuest(product)),
    updateProduct: (id, newInfo) => dispatch(putProduct(id, newInfo)),
    deleteProduct: id => dispatch(destroyProduct(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
