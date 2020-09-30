import React from 'react'
import {connect} from 'react-redux'
import ls from 'local-storage'
import {me} from '../store/user'
import {gotProducts} from '../store/product'
import {Link, Route} from 'react-router-dom'
import {getCart, incrementItemQty, addToCart} from '../store/cart'
import {addToGuestCart, incrementItemQtyGuest} from '../store/cart-guest'
import {NewProduct} from './'

export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.state = {
      toggleProductForm: false
    }
  }

  async componentDidMount() {
    // set empty guest cart into localstorage initially (only if needed):
    if (!this.props.guestCartLocalStorage) ls.set('guestCart_', [])
    await this.props.getProducts()
    await this.props.getUser()
    if (this.props.user.id) await this.props.getCart(this.props.user.id) // for logged in user
    this.setState({loaded: true})
  }

  async handleAddToCart(userId, productId) {
    // for guest
    if (!this.props.user.id) {
      let itemIdxInCart = this.props.guestCartLocalStorage.findIndex(
        item => item.id === productId
      )
      // if item is not already in cart, add it but with qty 0
      if (itemIdxInCart === -1) await this.props.addToGuestCart(productId)
      itemIdxInCart = this.props.guestCartLocalStorage.findIndex(
        item => item.id === productId
      )
      // always increment qty of item by 1
      this.props.incrementGuest(this.props.guestCartLocalStorage[itemIdxInCart])
    } else {
      // for logged in user
      const itemIdxInCart = this.props.cart.findIndex(
        item => item.id === productId
      )
      // if item is not already in cart, add it but with qty 0
      if (itemIdxInCart === -1) await this.props.addToCart(userId, productId)
      // always increment qty of item by 1
      await this.props.increment(userId, productId)
    }
    this.props.history.push('/cart')
  }

  displayProductForm() {
    this.setState({
      toggleProductForm: true
    })
  }

  render() {
    const products = this.props.products
    const user = this.props.user

    if (products) {
      if (!this.state.loaded)
        return <div className="LoadingMsg">Products Are Loading...</div>
      else {
        return (
          <React.Fragment>
            {/* NEW PRODUCT FORM */}
            <div className="AllProductsAddProductDiv">
              <button
                type="button"
                onClick={() => this.displayProductForm()}
                className="AllProductsAddProductBtn"
              >
                Add New Product
              </button>
              {this.state.toggleProductForm ? (
                <div className="AllProductsNewProductFormDiv">
                  <Route component={NewProduct} />
                </div>
              ) : (
                ''
              )}
            </div>
            {products.map(product => {
              return (
                <div key={product.id} className="AllProductsSingleDiv">
                  <div>
                    <Link to={`/products/${product.id}`}>
                      <img
                        src={product.imageUrl}
                        width="150"
                        height="150"
                        className="AllProductsSingleImage"
                      />
                    </Link>
                  </div>
                  <div className="AllProductsSingleContent">
                    <Link to={`/products/${product.id}`}>
                      <h3 className="AllProductsSingleName">{product.name}</h3>
                    </Link>
                    <p>
                      <strong>Price:</strong> ${(product.price / 100).toFixed(
                        2
                      )}
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
                </div>
              )
            })}
          </React.Fragment>
        )
      }
    } else {
      return 'No Products to Display!'
    }
  }
}

const mapState = state => {
  return {
    products: state.products.products,
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
    getProducts: () => dispatch(gotProducts()),
    addToCart: (userId, productId) => dispatch(addToCart(userId, productId)),
    addToGuestCart: productId => dispatch(addToGuestCart(productId)),
    increment: (userId, productId) =>
      dispatch(incrementItemQty(userId, productId)),
    incrementGuest: product => dispatch(incrementItemQtyGuest(product))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
