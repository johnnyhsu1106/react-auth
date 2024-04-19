import PropTypes from 'prop-types';

const FormHeading = ({ className, text}) => {
  if (!text) {
    return null;
  }
  return (
    <h2 className={`text-center mb-4 ${className}`}>{text}</h2>
  )
};

FormHeading.defaultProps = {
  className: '',
};

FormHeading.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default FormHeading;
