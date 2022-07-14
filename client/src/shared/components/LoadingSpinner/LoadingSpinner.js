import classes from './LoadingSpinner.module.css';

const LoadingSpinner = (props) => {
  return <div className={`${classes.spinner} ${props.className} relative z-50`}></div>;
}

export default LoadingSpinner;
