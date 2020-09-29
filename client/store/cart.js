import axios from 'axios'
import ls from 'local-storage'

// ACTION TYPES
const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_ITEM = 'DELETE ITEM'
const GET_SUBTOTAL = 'GET_SUBTOTAL'
const CLEAR_CART = 'CLEAR_CART'
const SAVE_GUEST_CART = 'SAVE_GUEST_CART'

// ACTION CREATORS
const gotCart = cart => ({
  type: GET_CART,
  cart
})

const updatedCart = () => ({
  type: UPDATE_CART
})

const addedToCart = () => ({
  type: ADD_TO_CART
})

const deletedFromCart = () => ({
  type: DELETE_ITEM
})

export const getSubtotal = () => ({
  type: GET_SUBTOTAL
})

const clearedCart = () => ({
  type: CLEAR_CART
})

const savedGuestCart = () => ({
  type: SAVE_GUEST_CART
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

export const clearCart = userId => async dispatch => {
  try {
    await axios.delete(`/api/cart/${userId}`)
    dispatch(clearedCart())
  } catch (error) {
    console.error(error)
  }
}

export const saveGuestCart = (userId, cart) => async dispatch => {
  try {
    let cartData = []
    cart.forEach(item => {
      let cartItem = [item.id, item.qty]
      cartData.push(cartItem)
    })
    console.log('cartData in thunk-->', cartData)
    await axios.put(`/api/cart/${userId}`, cartData)
    ls.remove('guestCart_')
    dispatch(savedGuestCart())
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
    case GET_SUBTOTAL:
      return {
        ...state,
        subtotal: state.cart.reduce((subtotal, item) => {
          subtotal += item.price * item.qty
          return subtotal
        }, 0)
      }
    case CLEAR_CART:
      return {
        ...state,
        cart: []
      }
    case SAVE_GUEST_CART:
      return {
        ...state
      }
    default:
      return state
  }
}
