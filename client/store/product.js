import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCTS = 'ADD_PRODUCTS'
const GET_SINGLE = 'GET_SINGLE'
const DELETE_PRODUCTS = 'DELETE_PRODUCTS'
const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

const addProducts = product => ({
  type: ADD_PRODUCTS,
  product
})

const getSingle = product => ({
  type: GET_SINGLE,
  product
})

const deleteProduct = product => ({
  type: DELETE_PRODUCTS,
  product
})

const updateProduct = product => ({
  type: UPDATE_PRODUCTS,
  product
})

/**
 * THUNK CREATORS
 */

export const gotProducts = () => async dispatch => {
  try {
    const {data: products} = await axios.get('/api/products')
    dispatch(getProducts(products))
  } catch (error) {
    console.error(error)
  }
}

export const gotSingle = id => async dispatch => {
  try {
    const {data: single} = await axios.get(`/api/products/${id}`)
    dispatch(getSingle(single))
  } catch (error) {
    console.error(error)
  }
}

export const addedProduct = product => async dispatch => {
  try {
    const {data: newProduct} = await axios.post('/api/products', product)
    dispatch(addProducts(newProduct))
  } catch (error) {
    console.error(error)
  }
}

export const deletedProduct = id => async dispatch => {
  try {
    await axios.delete(`/api/products/${id}`)
    dispatch(deleteProduct(id))
  } catch (error) {
    console.error(error)
  }
}

export const updatedProduct = (id, productUpdate) => async dispatch => {
  try {
    const res = await axios.put(`/api/products/${id}`, productUpdate)
    dispatch(updateProduct(res.data))
  } catch (error) {
    console.error(error)
  }
}
/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, products: action.products}
    case GET_SINGLE:
      return {...state, product: action.product}
    case ADD_PRODUCTS:
      return [...state, action.product]
    case DELETE_PRODUCTS:
      return state.filter(product => product.id !== action)
    case UPDATE_PRODUCTS:
      return state.filter(
        product => (product.id === action.product.id ? action.product : product)
      )
    default:
      return state
  }
}
