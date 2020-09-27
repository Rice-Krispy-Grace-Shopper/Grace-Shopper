import axios from 'axios'

// ACTION TYPES
const UPDATE_GUEST_CART = 'UPDATE_GUEST_CART'
const ADD_TO_GUEST_CART = 'ADD_TO_GUEST_CART'
const DELETE_GUEST_ITEM = 'DELETE_GUEST_ITEM'
const REMOVE_GUEST_CART = 'REMOVE_CART'

// ACTION CREATORS
const updatedCart = product => ({
  type: UPDATE_GUEST_CART,
  product
})

const addedToCart = product => ({
  type: ADD_TO_GUEST_CART,
  product
})

const deletedFromCart = product => ({
  type: DELETE_GUEST_ITEM,
  product
})

export const removedGuestCart = () => ({
  type: REMOVE_GUEST_CART
})

// THUNK CREATORS
export const incrementItemQtyGuest = product => dispatch => {
  // refactor
  product.qty++
  dispatch(updatedCart(product))
}

export const decrementItemQtyGuest = product => dispatch => {
  // refactor
  product.qty--
  dispatch(updatedCart(product))
}

export const addToGuestCart = productId => async dispatch => {
  try {
    const {data: product} = await axios.get(`/api/products/${productId}`)
    product.qty = 0
    dispatch(addedToCart(product))
  } catch (error) {
    console.error(error)
  }
}

// unnecessary thunk, can refactor to export action creator later:
export const deleteFromGuestCart = product => dispatch => {
  dispatch(deletedFromCart(product))
}

// INITIAL STATE
const cart = []

// REDUCER
export default function(state = cart, action) {
  switch (action.type) {
    case UPDATE_GUEST_CART:
      return state.map(item => {
        if (item.id !== action.product.id) return item
        else {
          return action.product
        }
      })
    case ADD_TO_GUEST_CART:
      return [...state, action.product]
    case DELETE_GUEST_ITEM:
      return state.filter(item => item.id !== action.product.id)
    case REMOVE_GUEST_CART:
      return cart
    default:
      return state
  }
}
