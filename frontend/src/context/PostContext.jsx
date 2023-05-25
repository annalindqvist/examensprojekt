// REACT IMPORTS
import { createContext, useReducer } from 'react';

export const PostContext = createContext();

export const postReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POST': 
      return {
        ...state,
        posts: action.payload
      };
    case 'CREATE_POST':
      return {     
        ...state,   
        posts: action.payload
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((p) => p._id !== action.payload)
      }
    case 'UPDATE_POST':
      return {   
      ...state,     
      posts: action.payload
    }
    case 'SET_SELECTED_POST':
    return {
      ...state, selectedPost: action.payload
    }
    default:
      return state
  }
}

export const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, {
    posts: null,
    selectedPost: null
  })

  return (
    <PostContext.Provider value={{...state, dispatch}}>
      { children }
    </PostContext.Provider>
  )
}