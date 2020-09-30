import React from 'react'
import {connect} from 'react-redux'
import ls from 'local-storage'
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
    // set empty guest cart into localstorage initially (only if needed):
    if (!this.props.guestCartLocalStorage) ls.set('guestCart_', [])
    const id = this.props.match.params.id
    await this.props.getSingle(id)
    await this.props.getUser()
    if (this.props.user.id) await this.props.getCart(this.props.user.id) // for logged in user
  }

  async handleAddToCart(userId, productId) {
    // for guest
    if (!this.props.user.id) {
      let itemIdxInCart = this.props.guestCartLocalStorage.findIndex(
        item => item.id === productId
      )
      if (itemIdxInCart === -1) await this.props.addToGuestCart(productId)
      itemIdxInCart = this.props.guestCartLocalStorage.findIndex(
        item => item.id === productId
      ) // re-assign after adding to cart
      this.props.incrementGuest(this.props.guestCartLocalStorage[itemIdxInCart])
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

  handleDelete = () => {
    // event.preventDefault();
    if (!this.props.user.isAdmin) return // add message
    this.props.deleteProduct(this.props.product.id)
    this.props.history.push('/products')
  }

  handleUpdate = event => {
    event.preventDefault()
    if (!this.props.user.isAdmin) return // add message
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
    this.props.getSingle(productId)
  }

  render() {
    const product = this.props.product
    const user = this.props.user

    if (product) {
      return (
        <React.Fragment>
          <div className="SingleProductDiv">
            <div className="SingleProductHeaderDiv">
              <h2>{product.name}</h2>
              {/* DELETE PRODUCT BUTTON -- only display for admin users */}
              {this.props.user.id && this.props.user.isAdmin ? (
                <button
                  type="button"
                  className="SingleProductDeleteBtn"
                  onClick={() =>
                    window.confirm(
                      'This action will permanently delete the product in the database. Are you sure you want to continue?'
                    ) && this.handleDelete()
                  }
                >
                  &times;
                </button>
              ) : (
                ''
              )}
            </div>
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
          </div>
          <div className="SingleProductAdminForm">
            {/* DELETE PRODUCT BUTTON -- only display for admin users */}
            {/* {this.props.user.id && this.props.user.isAdmin ? (
							<div className="SingleProductAdminDeleteBtn">
								<button type="button" className="remove-product" onClick={this.handleDelete}>
									&times;
								</button>
							</div>
						) : (
							''
						)} */}

            {/* EDIT PRODUCT FORM -- only display for admin users */}
            {/* {this.props.user.id && this.props.user.isAdmin ? (
							<div className="SingleProductAdminEditDiv">
								<form onSubmit={this.handleUpdate}>
									<label>
										Name:
										<input type="text" name="nameOfProduct" onChange={this.handleChange} />
									</label>

									<label>
										Description:
										<input type="text" name="descriptionOfProduct" onChange={this.handleChange} />
									</label>

									<label>
										Price:
										<input type="text" name="priceOfProduct" onChange={this.handleChange} />
									</label>

									<label>
										Image URL:
										<input type="text" name="imageOfProduct" onChange={this.handleChange} />
									</label>
									<button type="submit">Submit</button>
								</form>
							</div>
						) : (
							''
						)} */}
          </div>
        </React.Fragment>
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
    guestCart: state.guestCart,
    guestCartLocalStorage: ls.get('guestCart_')
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
