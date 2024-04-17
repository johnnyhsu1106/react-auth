import { Button } from 'react-bootstrap';
import './FormButton.css';
import checkIcon from '/images/checkbox-circular-stroke.svg'
import PropTypes from 'prop-types';


const FormButton = ({
  className,
  disabled,
  isSucceed,
  isLoading,
  type,
  text,
  variant,
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
          <span className="sr-only">Loading...</span>
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

FormButton.displayName = 'FormButton';

FormButton.defaultProps = {
  className: '',
  disabled: false,
  isSucceed: false,
  isLoading: false,
  type: 'submit',
  text: 'Submit',
  variant: 'primary',
};

FormButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isSucceed: PropTypes.bool,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  text: PropTypes.string,
  variant: PropTypes.string,
};

export default FormButton;
