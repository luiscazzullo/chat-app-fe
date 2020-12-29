import { useContext } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { AuthContext } from '../auth/authContext';
import SidebarChatItem from './SidebarChatItem';

const Sidebar = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);
  const users = chatState?.users.filter(user => user.uid !== auth.uid);
  return (
    <div className="inbox_chat">
      {
        users.map((user, index) => (
          <SidebarChatItem user={user} key={index} />
        ))
      }
      <div className="extra_space"></div>
    </div>
  );
}
 
export default Sidebar;