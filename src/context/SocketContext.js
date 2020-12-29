import React, { createContext, useContext, useEffect } from 'react';
import { AuthContext } from '../auth/authContext';
import { useSocket } from '../hooks/useSocket'
import { ChatContext } from './chat/ChatContext';
import { NEW_MESSAGE, GET_USERS } from '../types/types';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

  const { socket, online, connectSocket, disconnectSocket } = useSocket('http://localhost:8080');
  const { auth } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if(auth.logged) {
      connectSocket();
    }
  }, [auth, connectSocket])

  useEffect(() => {
    if (!auth.logged) {
      disconnectSocket();
    }
  }, [auth, disconnectSocket])

  useEffect(() => {

    socket?.on('lista-usuarios', users => {
      dispatch({
        type: GET_USERS,
        payload: users
      })
    })

  }, [socket])

  useEffect(() => {
    socket?.on('mensaje-personal', message => {
      dispatch({
        type: NEW_MESSAGE,
        payload: message
      })
      scrollToBottomAnimated('messages');
    })
  }, [socket, dispatch])

  return (
    <SocketContext.Provider value={{ socket, online }}>
      { children}
    </SocketContext.Provider>
  )
}