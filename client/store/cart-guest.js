import axios from 'axios'

// ACTION TYPES
const UPDATE_CART = 'UPDATE_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_ITEM = 'DELETE ITEM'

// ACTION CREATORS
const updatedCart = product => ({
  type: UPDATE_CART,
  product
})

const addedToCart = product => ({
  type: ADD_TO_CART,
  product
})

const deletedFromCart = product => ({
  type: DELETE_ITEM,
  product
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
    case UPDATE_CART:
      // remove previous item on state and add it back with qty incremented/decremented:
      return [
        ...state.filter(item => item.id !== action.product.id),
        action.product
      ]
    case ADD_TO_CART:
      return [...state, action.product]
    case DELETE_ITEM:
      return [...state.filter(item => item.id !== action.product.id)]
    default:
      return state
  }
}
