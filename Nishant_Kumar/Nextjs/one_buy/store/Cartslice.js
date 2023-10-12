import { createSlice } from '@reduxjs/toolkit'

export const Cartslice = createSlice({
  name: 'cart',
  initialState: {
    cartItem: [],
  },
  reducers: {
    additem : (state , action)=>{
        const item = state.cartItem.find((p)=>p.id === action.payload.id)
        if (item)
        {
            item.quantity++;
            item.attributes.price = item.oneQuantityprice * item.quantity
        }
        else{
            state.cartItem.push({...action.payload , quantity : 1})
        }
    },
    deleteitem : (state , action)=>{
        state.cartItem = state.cartItem.filter((p)=>p.id != action.payload.id )
    }    
  },
})

// Action creators are generated for each case reducer function
export const {additem , deleteitem} = Cartslice.actions

export default Cartslice.reducer