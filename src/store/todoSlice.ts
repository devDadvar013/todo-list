import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TodoItem {
  id: number;
  title: string;
  edit : boolean;
}

export interface ITodoState {
  todo : TodoItem[];
}

const initialState: ITodoState = {
  todo : [
    // {
    //   id :1,
    //   text : 'title',
    //   edit : false
    // }
  ]
};

export const todoSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTodoAddItem: (state, action: PayloadAction<TodoItem>) => {
        return {
        ...state,
        todo: [...state.todo, action.payload]
      }
    },
    setTodoEditItem: (state, action: PayloadAction<TodoItem>) => {
      const data = action.payload
        return {
          ...state,
          todo: state.todo.map((todo:any) =>
          todo.id === data.id
            ? ({ ...todo, edit: todo.edit ? false : true} as TodoItem)
            : todo
        ),
        }
    },
    onChangeTodoItemTitle: (state, action: PayloadAction<TodoItem>) => {
      const data = action.payload
        
        return {
          ...state,
          todo: state.todo.map((todo:any) =>
          todo.id === data.id
            ? ({ ...todo,title:data.title} as TodoItem)
            : todo
        ),
        }
    },
    setTodoDeleteItem: (state, action: PayloadAction<TodoItem>) => {
      const data = action.payload
        return {
          ...state,
          todo: state.todo.filter(item => item.id !== data.id),
        }
    },
    // setTodoValueSearch: (state, action: PayloadAction<string>) => {
    //   const data = action.payload      
      
    //     return {
    //       ...state,
    //       todo: [...state.todo].filter((user) => user.title.toLowerCase().includes(data.toLowerCase()))
    //     }
    // },
    
  },
});

export const { setTodoAddItem,setTodoEditItem,onChangeTodoItemTitle,setTodoDeleteItem } = todoSlice.actions;
export const authReducer = todoSlice.reducer;
