import Proptypes from 'prop-types';


const FormFooter = ({ children, text }) => {
  return (
    <div className='w-100 text-center mt-2'>
      {text} {children}
    </div>
  )
};

FormFooter.defaultProps = {
  text: ''
};

FormFooter.propTypes = {
  text: Proptypes.string,
  children: Proptypes.node,
};

export default FormFooter;
