// REACT IMPOrTS
import { useState } from 'react'

// IMPORT HOOKS
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, firstname, lastname, age, city, password1, password2, terms) => {
    setError(null)

    const res = await fetch(`http://localhost:8080/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, firstname, lastname, age, city, password1, password2, terms })
    })
    const json = await res.json()

    if (!res.ok) {
      setError(json.message);
    };
    if (res.ok) {
      // save the user to local storage
      localStorage.setItem('token', json.token);
      //console.log("user", json.user)
      localStorage.setItem('user', JSON.stringify(json.user));

      // // update the auth context
      dispatch({ type: 'SIGNIN', payload: json.user });

    }
  }

  return { signup, error }
}