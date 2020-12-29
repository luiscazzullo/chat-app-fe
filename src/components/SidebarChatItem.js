import { useContext } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { SELECT_ACTIVE_CHAT, GET_ALL_MESSAGES } from '../types/types';
import { fetchWithToken } from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scrollToBottom';

const SidebarChatItem = ({ user }) => {
  const { dispatch, chatState } = useContext(ChatContext);

  const selectChat = async () => {
    dispatch({
      type: SELECT_ACTIVE_CHAT,
      payload: user.uid
    })
    const response = await fetchWithToken(`messages/${user.uid}`);
    dispatch({
      type: GET_ALL_MESSAGES,
      payload: response.messages
    })
    scrollToBottom('messages');
  }

  return (
    <div 
      className={`chat_list ${chatState.activeChat === user.uid && 'active_chat'}`}
      onClick={() => selectChat()}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
        </div>
        <div className="chat_ib">
          <h5>{user.name}</h5>
          {
            user.online
            ? (<span className="text-success">Online</span>)
            : (<span className="text-danger">Offline</span>)
          }
        </div>
      </div>
    </div>
  );
}
 
export default SidebarChatItem;