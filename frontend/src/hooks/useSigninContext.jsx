// IMPORT REACT
import { useState } from 'react';

// IMPORT HOOKS
import { useAuthContext } from './useAuthContext';

export const useSignin = () => {
  const [error, setError] = useState(null);
  const { dispatch, user } = useAuthContext();

  const signin = async (email, password) => {

    setError(null);

    // if not filled in email or password, return setError
    if(!email || !password){
      return setError("Please fill in both email and password");
    }

    const res = await fetch('https://143-42-49-241.ip.linodeusercontent.com:8080/sign-in', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await res.json();

    if (!res.ok) {
      // if error signin in - setError
      setError(json.error);
    };
    if (res.ok) {
      // save the user to local storage
      localStorage.setItem('token', json.token);
      localStorage.setItem('user', JSON.stringify(json.user));
      // update the auth context
      dispatch({type: 'SIGNIN', payload: json.user});
    }
  }

  return { signin, error };
}