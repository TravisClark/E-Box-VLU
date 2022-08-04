import classes from './LoadingSpinner.module.css';

const LoadingSpinner = (props) => {
  return <div className={`${classes.spinner} ${props.className} `}></div>;
}

export default LoadingSpinner;
