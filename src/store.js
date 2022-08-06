import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  number: 0,
};


export const __addNumber = createAsyncThunk(
	"ADD_NUMBER_WAIT",
	(args, thunkAPI)=>{
		setTimeout(() => {
      thunkAPI.dispatch(addNumber(args));
    }, 3000);
	},
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addNumber: (state, action) => {
      state.number = state.number + action.payload;
    },

    minusNumber: (state, action) => {
      state.number = state.number - action.payload;
    },
  },
});

export const { addNumber, minusNumber } = counterSlice.actions;

export default configureStore({
	reducer: {
		counter: counterSlice.reducer,
	}
})