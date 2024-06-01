// jitna bhi user se related rahega utna yeha pe create karange

// 1. import createSlice
import {createSlice} from '@reduxjs/toolkit'


//2 create slice
export const userSlice = createSlice({
    name:'user',
    initialState:{
        user:null
    },
    reducers:{
        setUser:(state, action)=>{
            // here full fill intial state
            state.user = action.payload
        }
    }
})

export const {setUser} = userSlice.actions;
