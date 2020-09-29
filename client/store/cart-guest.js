import axios from 'axios'
import ls from 'local-storage'

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

export const deleteItemGuestCart = product => ({
  type: DELETE_GUEST_ITEM,
  product
})

export const removedGuestCart = () => ({
  type: REMOVE_GUEST_CART
})

// THUNK CREATORS
// unnecessary thunk creator, refactor to action creator
export const incrementItemQtyGuest = product => dispatch => {
  product.qty++
  dispatch(updatedCart(product))
}

// unnecessary thunk creator, refactor to action creator
export const decrementItemQtyGuest = product => dispatch => {
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

// INITIAL STATE
const cart = []

// REDUCER
export default function(state = cart, action) {
  const guestCart_ = 'guestCart_'
  const currentLocalState = ls.get('guestCart_')

  switch (action.type) {
    case UPDATE_GUEST_CART:
      ls.set(
        guestCart_,
        currentLocalState.map(item => {
          if (item.id !== action.product.id) return item
          else {
            return action.product
          }
        })
      )
      return state.map(item => {
        if (item.id !== action.product.id) return item
        else {
          return action.product
        }
      })
    case ADD_TO_GUEST_CART:
      ls.set(guestCart_, [...(currentLocalState || []), action.product])
      return [...state, action.product]
    case DELETE_GUEST_ITEM:
      ls.set(guestCart_, [
        ...(currentLocalState.filter(item => item.id !== action.product.id) ||
          [])
      ])
      return state.filter(item => item.id !== action.product.id)
    case REMOVE_GUEST_CART:
      ls.remove(guestCart_)
      return cart
    default:
      return state
  }
}
