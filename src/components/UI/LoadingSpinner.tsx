import classes from './LoadingSpinner.module.css';

const LoadingSpinner: React.FC<{marginLeft?: string}> = (props) => {
  return <div className={classes.spinner} style={props.marginLeft ? {marginLeft:props.marginLeft} : {}}></div>;
}

export default LoadingSpinner;