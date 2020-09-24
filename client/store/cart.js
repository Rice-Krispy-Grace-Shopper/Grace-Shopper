import axios from 'axios'

// ACTION TYPES
const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_ITEM = 'DELETE ITEM'

// ACTION CREATORS
const gotCart = cart => ({
  type: GET_CART,
  cart
})

// refactor -- remove cart param
const updatedCart = cart => ({
  type: UPDATE_CART,
  cart
})

const addedToCart = () => ({
  type: ADD_TO_CART
})

const deletedFromCart = () => ({
  type: DELETE_ITEM
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

export const addToCart = (userId, productId) => async dispatch => {
  try {
    await axios.post(`/api/cart/${userId}/${productId}/add`)
    dispatch(addedToCart())
  } catch (error) {
    console.error(error)
  }
}

export const deleteFromCart = (userId, productId) => async dispatch => {
  try {
    await axios.delete(`/api/cart/${userId}/${productId}/delete`)
    dispatch(deletedFromCart())
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
    case ADD_TO_CART:
      return {
        ...state
      }
    case DELETE_ITEM:
      return {
        ...state
      }
    default:
      return state
  }
}
