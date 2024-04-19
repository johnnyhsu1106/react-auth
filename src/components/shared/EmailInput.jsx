import { forwardRef, useId } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';


const EmailInput = forwardRef(({
  className, 
  defaultValue='',
  placeholder
}, ref) => {
  const emailInputId = useId();

  return (
    <Form.Group 
      controlId={`email-${emailInputId}`} 
      className={className}
    >
      <Form.Control 
        type='email' 
        ref={ref} 
        required
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </Form.Group>
  )
});

EmailInput.displayName = 'EmailInput';

EmailInput.defaultProps = {
  className: '',
  defaultValue: '',
  placeholder: 'Example@gmail.com'
};

EmailInput.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string
};

export default EmailInput;
