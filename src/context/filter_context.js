import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products : [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  }
}
//we set sort to 'price-lowest' so that that will be the inivial value of sort
const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const {products} = useProductsContext()
  const[state, dispatch] = useReducer(reducer, initialState)

useEffect(()=>{
dispatch({ type:LOAD_PRODUCTS, payload: products })
},[products])

useEffect(()=>{
  dispatch({type: FILTER_PRODUCTS})
dispatch({ type:SORT_PRODUCTS })
},[products, state.sort, state.filters])

const setGridView = ()=>{
  dispatch ({ type: SET_GRIDVIEW })
}
const setListView = ()=>{
  dispatch ({ type: SET_LISTVIEW })
}
const updateSort = (e)=>{
  // const name = e.target.name;
  const value = e.target.value
  dispatch({type:UPDATE_SORT, payload:value})
}

const updateFilters = (e)=>{
let name = e.target.name
let value = e.target.value 
if (name === 'category'){
  value = e.target.textContent
}
if (name === 'color'){
  value = e.target.dataset.color
}
if (name === 'price'){
  value = Number(value)
}
if (name === 'shipping'){
  value = e.target.checked
}
// console.log(value);
dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
}
const clearFilters = ()=>{
  dispatch({ type: CLEAR_FILTERS})
}

  return (
    <FilterContext.Provider value= {{
      ...state,
      setGridView,
      setListView,
      updateSort,
      updateFilters,
      clearFilters
      }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}

// We're setting up useEffect to pass in the product becuase we cant pass in the product which we're importing from another hook directly into the initial state. Hence we'll have to set up a function to pass it in

//htmlfor on the label is used to match the id of the input youre working with