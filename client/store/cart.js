import axios from 'axios'

// ACTION TYPES
const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'

// ACTION CREATORS
const gotCart = cart => ({
  type: GET_CART,
  cart
})

const updatedCart = cart => ({
  type: UPDATE_CART,
  cart
})

// THUNK CREATORS
export const getCart = userId => async dispatch => {
  try {
    const {data: cart} = await axios.get(`/api/cart/${userId}`)
    dispatch(gotCart(cart))
  } catch (error) {
    console.error(error)
  }
}

export const incrementItemQty = (userId, productId) => async dispatch => {
  try {
    const {data: cart} = await axios.put(`/api/cart/${userId}/${productId}/inc`)
    dispatch(updatedCart(cart))
  } catch (error) {
    console.error(error)
  }
}

export const decrementItemQty = (userId, productId) => async dispatch => {
  try {
    const {data: cart} = await axios.put(`/api/cart/${userId}/${productId}/dec`)
    dispatch(updatedCart(cart))
  } catch (error) {
    console.error(error)
  }
}

// INITIAL STATE
const cart = {}

// REDUCER
export default function(state = cart, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.cart
      }
    case UPDATE_CART:
      return {
        ...state
      }
    default:
      return state
  }
}
