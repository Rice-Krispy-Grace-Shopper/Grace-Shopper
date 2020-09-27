import axios from 'axios'

// ACTION TYPES
const SUBMIT_ORDER = 'SUBMIT_ORDER'

// ACTION CREATORS
const submittedOrder = () => ({
  type: SUBMIT_ORDER
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

// INITIAL STATE
const order = []

// REDUCER
export default function(state = order, action) {
  switch (action.type) {
    case SUBMIT_ORDER:
      return state
    default:
      return state
  }
}
