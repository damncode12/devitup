import { configureStore } from '@reduxjs/toolkit'
import Cartslice from './Cartslice'

export default configureStore({
  reducer: {
    cart : Cartslice
  },
})