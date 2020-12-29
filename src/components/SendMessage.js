import { useState,useContext } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { SocketContext } from '../context/SocketContext';
import { AuthContext } from '../auth/authContext';

const SendMessage = () => {

  const [message, setMessage] = useState('');
  const { chatState, dispatch } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const { activeChat } = chatState;

  const handleSubmit = e => {
    e.preventDefault();
    if(message.length === 0) {
      return;
    }
    setMessage('');
    socket.emit('mensaje-personal', {
      from: auth.uid,
      to: activeChat,
      message
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input 
            type="text" 
            className="write_msg" 
            placeholder="Mensaje..."
            value={message}
            name="message"
            onChange={e => setMessage(e.target.value)}
          />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            enviar
          </button>
        </div>
      </div>
    </form>
  );
}
 
export default SendMessage;