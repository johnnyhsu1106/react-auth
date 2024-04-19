import { Link } from 'react-router-dom';


const PageNotFound = () => {
  return (
    <div className="text-center">
      <h1 className="display-1 fw-bold">404</h1>
      <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
      <p className="lead">
        The page you&#39;re looking for doesn&#39;t exist.
      </p>
      <Link
        className='btn btn-primary' 
        to='/'>
          Go home
      </Link>
    </div>
  )
}

export default PageNotFound;
