import { Button } from 'react-bootstrap';

const FormButton = ({
  variant='primary',
  disabled=false,
  className,
  type='submit',
  text='Submit'
}) => {
  return (
    <Button 
      variant={variant}
      disabled={disabled} 
      className={className} 
      type={type}
    >
      {text}
    </Button>
  )
};

export default FormButton;
