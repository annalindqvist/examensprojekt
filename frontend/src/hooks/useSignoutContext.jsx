import { useAuthContext } from './useAuthContext'
import { useSocketContext } from "./useSocketContext";

export const useSignout = () => {
  const { dispatch } = useAuthContext()
  const { socket } = useSocketContext()

  const signout = () => {
    // remove user from storage
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    // Handle socket disconnection
    socket.on('disconnect', () => {
    console.log('Disconnected from Socket.io server.');
    });

    // dispatch logout action
    dispatch({ type: 'SIGNOUT' })
  }

  return { signout }
}