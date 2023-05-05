import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, firstname, lastname, password1, password2) => {
    setIsLoading(true)
    setError(null)

    const res = await fetch('http://localhost:8080/sign-up', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, firstname, lastname, password1, password2 })
    })
    const json = await res.json()
    
    if (!res.ok) {
      setIsLoading(false);
      setError(json.error);
    };
    if (res.ok) {
      // save the user to local storage
      localStorage.setItem('token', json.token);
      //console.log("user", json.user)
      localStorage.setItem('user', JSON.stringify(json.user));

      // // update the auth context
      dispatch({type: 'SIGNIN', payload: json.user});

      // update loading state
      setIsLoading(false);
    }
  }

  return { signup, isLoading, error }
}