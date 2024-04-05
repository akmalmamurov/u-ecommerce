import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '../slices/modalSlise'
const reducer = {
  modal: modalReducer
}
export const store = configureStore({ reducer })
