import { GET_USERS, SELECT_ACTIVE_CHAT, NEW_MESSAGE, GET_ALL_MESSAGES, CLEAN_CHATS } from '../../types/types';

export default (state, action) => {
  switch(action.type) {
    case CLEAN_CHATS:
      return {
        uid: '',
        activeChat: null,
        messages: [],
        users: []
      }
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case NEW_MESSAGE:
      if(state.activeChat === action.payload.from ||
        state.activeChat === action.payload.to
      ) {
        return {
          ...state,
          messages: [...state.messages, action.payload]
        }
      } else {
        return state;
      }
    case SELECT_ACTIVE_CHAT:
      if(state.activeChat === action.payload) return state
      return {
        ...state,
        activeChat: action.payload,
        messages: []
      }
    case GET_ALL_MESSAGES:
      return {
        ...state,
        messages: action.payload
      }
    default:
      return state;
  }
}