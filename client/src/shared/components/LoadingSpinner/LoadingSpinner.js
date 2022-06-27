import classes from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return <div className={`${classes.spinner} min-h-screen absolute top-0 left-0`}></div>;
}

export default LoadingSpinner;
