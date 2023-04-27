import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    
    case 'SIGNIN':
      //onsole.log("SIGNIN AUTHCONTEXT", action.payload)
      return { user: action.payload }
    case 'SIGNOUT':
      
      return { user: null }
    case 'UPDATEUSER':
      return { user: action.payload }
    default:
      return state;
  }
}

export const AuthContextProvider = ({ children }) => {

  const user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null;

  //console.log("USER IN AUTHCONTEXT, ", user);
  const [state, dispatch] = useReducer(authReducer, { 
    user
  })

  // const fetchUser = async () => {

  //   const token = JSON.parse(localStorage.getItem('token'))
  //   console.log("token fetchuser, ", token)
  //   if (token) {

  //     const userInformation = JSON.parse(localStorage.getItem('user'))
  //     dispatch({ type: 'SIGNIN', payload: userInformation }) 
  //     }
  // }

  // useEffect(() => {
  //   if(!state.user) {
  //     console.log("!state.user")
  //     fetchUser();
  //   }
  // },);

  console.log('AuthContext state:', state);
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}