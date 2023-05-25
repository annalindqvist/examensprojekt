import { createContext, useReducer} from 'react';

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    
    case 'SIGNIN':
      return { user: action.payload }
    case 'SIGNOUT':
      return { user: null }
    case 'UPDATE_USER':
      return { user: action.payload }
    default:
      return state;
  }
}

export const AuthContextProvider = ({ children }) => {

  const user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null;

  const [state, dispatch] = useReducer(authReducer, { 
    user
  })

  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}