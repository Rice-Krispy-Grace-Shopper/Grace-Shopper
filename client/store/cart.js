import axios from 'axios'

// ACTION TYPES
const GET_CART = 'GET_CART'

// ACTION CREATORS
const gotCart = cart => ({
  type: GET_CART,
  cart
})

// THUNK CREATORS
export const getCart = userId => async dispatch => {
  try {
    const {data: cart} = await axios.get(`/api/cart/${userId}`)
    dispatch(gotCart(cart))
  } catch (err) {
    console.error(err)
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
    default:
      return state
  }
}
