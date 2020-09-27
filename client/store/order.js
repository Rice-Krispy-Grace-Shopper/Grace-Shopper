import axios from 'axios'

// ACTION TYPES
const SUBMIT_ORDER = 'SUBMIT_ORDER'

// ACTION CREATORS
const submittedOrder = () => ({
  type: SUBMIT_ORDER
})

// THUNK CREATORS
export const submitOrder = userId => async dispatch => {
  try {
    const {data: order} = await axios.post(`/api/order/${userId}`)
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
      return []
    default:
      return state
  }
}
