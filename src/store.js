import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __addNumber = createAsyncThunk(
  "ADD_NUMBER_WAIT",
  (args, thunkAPI) => {
    setTimeout(() => {
      thunkAPI.dispatch(addNumber(args));
    }, 3000);
  }
);

export const __getTodos = createAsyncThunk(
  "todos/getTodos",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/todos");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState: { number: 0 },
  reducers: {
    addNumber: (state, action) => {
      state.number = state.number + action.payload;
    },

    minusNumber: (state, action) => {
      state.number = state.number - action.payload;
    },
  },
});

export const todosSlice = createSlice({
  name: "todos",
	initialState: {
    todos: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [__getTodos.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.todos = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});


export const { addNumber, minusNumber } = counterSlice.actions;

export default configureStore({
  reducer: {
    counter: counterSlice.reducer,
		todos: todosSlice.reducer,
  },
});
