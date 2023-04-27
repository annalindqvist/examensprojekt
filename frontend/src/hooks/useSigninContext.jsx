import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signin = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const res = await fetch('http://localhost:8080/sign-in', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      setError(json.error);
    };
    if (res.ok) {
      // save the user to local storage
      localStorage.setItem('token', json.token);
      console.log("user", json.user)
      localStorage.setItem('user', JSON.stringify(json.user));

      // // update the auth context
      dispatch({type: 'SIGNIN', payload: json.user});

      // update loading state
      setIsLoading(false);
    }
  }

  return { signin, isLoading, error };
}