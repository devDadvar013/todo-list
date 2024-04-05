"use client";

import React from "react";
import { setTodoAddItem,setTodoEditItem,onChangeTodoItemTitle,setTodoDeleteItem } from "@/store/todoSlice";
import { useAppDispatch } from "@/store";
import { useAppSelector } from "@/store";
import { useState, useEffect } from "react";

interface TodoItem {
  id: number;
  title: string;
  edit : boolean;
}


const Todo = () => {
  const dispatch = useAppDispatch();
  const todoState = useAppSelector((state) => state.todo.todo);

  const [todoValue, setTodoValue] = useState("")
  const [todoSearchData, setTodoSearchData] = useState(todoState)
  const [todoSearchValue, setTodoSearchValue] = useState('')


  useEffect(() => {
    setTodoSearchData(todoState)
  },[todoState])
  

  const _onSubmit = (e: any) => {
    e.preventDefault()
    const item = {
      id : Date.now(),
      title : todoValue,
      edit : false,
    }

    setTodoValue('')
    dispatch(setTodoAddItem(item))
    setTodoSearchValue('')
  }

  const onChangeTodoTitle = (event:any) => {
    const value = event.target.value
    setTodoValue(value)
  }

  const todoItemTitle = (i:TodoItem,value:string) => {
    const data = {
      ...i,
      title : value
    }

    dispatch(onChangeTodoItemTitle(data))
  }

  const todoSearch = (value:string) => {
    const result = todoState.filter((user:TodoItem) => user.title.toLowerCase().includes(value.toLowerCase()))
    setTodoSearchData(result)
    setTodoSearchValue(value)
    console.log(result,'result');
    
  }

  const todoDelete = (i:TodoItem) => {
    dispatch(setTodoDeleteItem(i))
    setTodoSearchValue('')
  }


  return (
       <div className="container mr-auto ml-auto mt-6">
          <h1 className="text-center text-3xl font-semibold mb-4">
                To Do List
            </h1>
          <div className="md:w-1/2 mx-auto">
              <div className="bg-white rounded-lg p-6 max-2	">
                  <form onSubmit={_onSubmit} id="todo-form">
                      <div className="flex mb-4">
                          <input type="text"
                                className="w-full px-4 py-2 mr-2 rounded-lg
                              border-gray-300 focus:outline-none
                                focus:border-blue-500
                                border-2 border-solid
                                "
                                onChange={(e:any) => onChangeTodoTitle(e)}
                                value={todoValue}
                                placeholder="Add new task" required />
                          <button className="bg-blue-500 hover:bg-blue-700 
                              text-white font-bold py-2 px-4 rounded">
                                Add
                            </button>
                      </div>
                  </form>
                  <ul id="todo-list">
                    <div className="flex mb-4 md:w-1/2 mx-auto">
                      
                          <input type="text"
                                className="w-full px-4 py-2 mr-2 rounded-lg
                              border-gray-300 focus:outline-none
                                focus:border-blue-500
                                border-2 border-solid
                                
                                "
                                value={todoSearchValue}
                                onChange={(e:any) => todoSearch(e.target.value)}
                                
                                placeholder="search" required />


                          {/* <button onClick={() => (setTodoValueSearch(''),dispatch(todoSubmitSearch(todoValueSearch)))} className="bg-blue-500 hover:bg-neutral-100 
                              text-white font-bold py-2 px-4 rounded bg-neutral-300	">
                                  <svg fill="#373737" height="20px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 488.4 488.4">
                                  <g>
                                    <g>
                                      <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6
                                        s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2
                                        S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7
                                        S381.9,104.65,381.9,203.25z"/>
                                    </g>
                                  </g>
                                  </svg>
                            </button> */}

                      </div>
                    <div className="max-h-52 overflow-auto		">
                      {todoSearchData.map( (i:any) =>{
                          return(
                            <li key={i.id} className="flex w-100 mb-4 items-center">
                            <label className="flex grow">
                                  {/* {
                                    i.edit 
                                    ?
                                    <input type="text"
                                    className="w-full px-4 py-2 mr-2 rounded-lg
                                  border-gray-300 focus:outline-none
                                    focus:border-blue-500 pointer-none text-xl"
                                    value={i.edit}
                                    placeholder=""  />
                                    :
                                    <span className="text-xl">{i.title}</span>
                                  } */}
                                  
                                  <input type="text"
                                    className={`w-full px-4 py-2 mr-2 rounded-lg
                                    border-gray-300 focus:outline-none
                                      focus:border-blue-500 pointer-none text-xl 
                                      ${i.edit ? 'bg-slate-50' : 'bg-transparent'}
                                        `}
                                    defaultValue={i.title}
                                    placeholder="" 
                                    disabled={!i.edit}
                                    onChange={(e:any) => todoItemTitle(i,e.target.value)}
                                  />
                              </label>
                              <div className="flex">
                                  <svg  onClick={() => todoDelete(i)} style={{fill:'red'}} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer mr-1 " viewBox="0 0 24 24" width="25px" height="25px"><path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"/></svg>
                                  <svg onClick={() => dispatch(setTodoEditItem(i))} style={{fill:'#3af209'}} className="cursor-pointer" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                              </div>
                          </li>
                        )
                        })}
                    </div>

                  </ul>
              </div>
          </div>
        </div>
  );
};


export default Todo;
