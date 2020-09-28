import axios from 'axios'

// ACTION TYPES
const SUBMIT_ORDER = 'SUBMIT_ORDER'
const GET_ORDERS = 'GET_ORDERS'

// ACTION CREATORS
const submittedOrder = () => ({
  type: SUBMIT_ORDER
})

const gotOrders = orders => ({
  type: GET_ORDERS,
  orders
})

// THUNK CREATORS
export const submitOrder = (userId, cart) => async dispatch => {
  try {
    let orderData = []
    cart.forEach(item => {
      let orderItem = [item.id, item.qty, item.price]
      orderData.push(orderItem)
    })
    await axios.post(`/api/order/${userId}`, orderData)
    dispatch(submittedOrder())
  } catch (error) {
    console.error(error)
  }
}

export const getOrders = userId => async dispatch => {
  try {
    const {data: orders} = await axios.get(`/api/order/${userId}`)
    dispatch(gotOrders(orders))
  } catch (error) {
    console.error(error)
  }
}

// INITIAL STATE
const orders = []

// REDUCER
export default function(state = orders, action) {
  switch (action.type) {
    case SUBMIT_ORDER:
      return state
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
