import { hourAndMonth } from '../helpers/hourAndMonth';
const OutgoingMessage = ({ message }) => {
  
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{message.message}</p>
        <span className="time_date">{hourAndMonth(message.createdAt)}</span>
      </div>
    </div>
  );
}
 
export default OutgoingMessage;