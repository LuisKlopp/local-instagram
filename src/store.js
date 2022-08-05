import { createSlice, configureStore } from "@reduxjs/toolkit"

const helloRedux = createSlice({
	name: 'helloRedux',
	initialState: ['야호'],              // initialState = state (= ['야호'])
	reducers: {
					hello(state, action) { 
							state.push(action.payload)			
					 },
			}
})

export let { hello } = helloRedux.actions

export default configureStore({
	reducer: {
			helloRedux : helloRedux.reducer 
	}
})