import { createContext, useReducer } from 'react';

export const PostContext = createContext();

export const postReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POST': 
    //console.log("SET_POST, action.payload", action.payload)
      return {
        ...state,
        posts: action.payload
      };
    case 'CREATE_POST':
        //console.log("CREATE_POST, action.payload", action.payload, "state.props", state.props)
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
       console.log("UPDATE_POST", action.payload)
      return {   
      ...state,     
      posts: action.payload
    }
    case 'SET_SELECTED_POST':
      console.log("ET_SELECTED_POST", action.payload)
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