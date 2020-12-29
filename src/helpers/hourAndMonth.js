import moment from 'moment';

export const hourAndMonth = (date) => {
  const today = moment(date);
  return today.format('HH:mm a | MMMM Do')
}