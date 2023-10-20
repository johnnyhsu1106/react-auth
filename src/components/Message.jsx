import { Alert } from 'react-bootstrap'


const Message = ({ 
  type, 
  message 
}) => {

  return (
    <>
      <Alert variant={type}>{message}</Alert>
    </>
  )
}

export default Message;
