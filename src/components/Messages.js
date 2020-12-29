import { useContext } from 'react';
import SendMessage from './SendMessage';
import IncomingMessage from './IncomingMessage';
import OutgoingMessage from './OutgoingMessage';
import { ChatContext } from '../context/chat/ChatContext';
import { AuthContext } from '../auth/authContext';

const Messages = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  return (
    <div className="mesgs">
      <div id="messages" className="msg_history">
        {
          chatState.messages.map((message, index) => (
            (message.to === auth.uid)
            ? (<IncomingMessage key={index} message={message} />)
            : (<OutgoingMessage key={index} message={message} />)
          ))
        }
      </div>
      <SendMessage />
    </div>
  );
}
 
export default Messages;