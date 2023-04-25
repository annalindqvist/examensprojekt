import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    
    case 'SIGNIN':
      console.log("SIGNIN AUTHCONTEXT", action.payload)
      return { user: action.payload }
    case 'SIGNOUT':
      return { user: null }
    default:
      return state;
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })

  // const fetchUser = async () => {

  //   const token = JSON.parse(localStorage.getItem('token'))
  //   console.log("token fetchuser, ", token)
  //   if (token) {

  //     const res = await fetch('http://localhost:8080/user/info', {
  //       method: 'GET',
  //       headers: {
  //           'Authorization': `Bearer ${token.token}`
  //       }})
  //       const json = await res.json();
  //       //console.log("JSON FROM USE EFFECT: ", json);
  //       if (res.ok) {
  //         dispatch({ type: 'SIGNIN', payload: json }) 
  //       }
  //       if (!res.ok) {
  //         console.log("res, ", res, "json, ", json)
  //       }
  //     }
  // }

  // useEffect(() => {
  //   if(!state.user) {
  //     console.log("!state.user")
  //     fetchUser();
  //   }
  // }, [dispatch]);

  console.log('AuthContext state:', state);
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}