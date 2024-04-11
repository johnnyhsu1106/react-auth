import { Button } from 'react-bootstrap';
import './FormButton.css';
import checkIcon from '/images/checkbox-circular-stroke.svg'


const FormButton = ({
  className,
  disabled=false,
  isSucceed=false,
  isLoading=false,
  type='submit',
  text='Submit',
  variant='primary',
}) => {
  if (isLoading) {
    return (
      <Button 
        className={className} 
        disabled={disabled || isLoading || isSucceed} 
        type={type}
        variant={variant}
      >
        <div className='spinner-border spinner-border-sm'  role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </Button>
    )
  }

  if (isSucceed) {
    return (
      <div className='d-flex justify-content-center mt-3'> 
        <img className='check' src={checkIcon} alt='check' />
      </div>
    )
  }

  return (
    <Button 
      className={className} 
      disabled={disabled || isLoading || isSucceed} 
      type={type}
      variant={variant}
    >
      {text}
    </Button>
  )
};

export default FormButton;
