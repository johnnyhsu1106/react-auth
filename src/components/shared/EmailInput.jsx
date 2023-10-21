import { forwardRef, useId } from 'react';
import { Form } from 'react-bootstrap';


const EmailInput = forwardRef(({className}, ref) => {
  const emailInputId = useId();

  return (
    <Form.Group 
      controlId={`email-${emailInputId}`} className={className}>
      <Form.Control 
        type='email' 
        ref={ref} 
        required
        placeholder='example@gmail.com'
      />
  </Form.Group>
  )
});

export default EmailInput;
