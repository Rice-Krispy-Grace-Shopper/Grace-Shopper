import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCTS = 'ADD_PRODUCTS'
const GET_SINGLE = 'GET_SINGLE'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

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

export const editProduct = (id, newInfo) => ({
  type: EDIT_PRODUCT,
  id,
  newInfo
})
export const deleteProduct = id => ({
  type: DELETE_PRODUCT,
  id
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

export const putProduct = (id, newInfo) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/products/${id}`, newInfo)
    dispatch(editProduct(data))
  } catch (error) {
    console.log(error)
  }
}
export const destroyProduct = id => async dispatch => {
  try {
    await axios.delete(`/api/products/${id}`)
    return dispatch(deleteProduct(id))
  } catch (error) {
    console.log(error)
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
      return {...state, product: action.product}
    case EDIT_PRODUCT:
      return {...state, product: action.product}
    case DELETE_PRODUCT:
      return {
        ...state,
        // changed this key from product to products:
        products: state.products.filter(
          product => product.id !== Number(action.id)
        )
      }
    default:
      return state
  }
}
