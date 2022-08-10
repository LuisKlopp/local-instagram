import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


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

export const addList = createAsyncThunk("ADD_TODO", async (newList) => {
  const response = await axios.post("http://localhost:3001/todos", newList);
  return response.data;
});

export const deleteList = createAsyncThunk("DELETE_TODO", async (id) => {
  const response = await axios.delete(`http://localhost:3001/todos/${id}`);
  return id;
});

export const updateList = createAsyncThunk("UPDATE_TODO", async ({id, obj}) => {
  const response = await axios.patch(`http://localhost:3001/todos/${id}`, obj);
  return { id, obj }
});




export const todosSlice = createSlice({
  name: "todos",
	initialState: {
    todos: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    },
  extraReducers: (builder) => {
    builder
    .addCase(__getTodos.pending, (state, action) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    });
    builder.addCase(__getTodos.fulfilled, (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.todos = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    });
    builder.addCase(__getTodos.rejected, (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    });
    builder.addCase(addList.fulfilled, (state, action) => { 
      state.todos = [...state.todos, action.payload];
      console.log(state.todos);
    });
    builder.addCase(deleteList.fulfilled, (state, action) => {
      state.todos =  state.todos.filter((todo) => todo.id !== action.payload);
      console.log(state.todos)
    });
    builder.addCase(updateList.fulfilled, (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, content: action.payload.content, title: action.payload.title };
        } else {
          return todo;
        }
      })
    }
    );
  },
});


// export const { __getTodos } = todosSlice.actions;

export default configureStore({
  reducer: {
		todos: todosSlice.reducer,
  },
});
