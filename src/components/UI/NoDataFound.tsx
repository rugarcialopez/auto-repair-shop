import { Link } from 'react-router-dom';

import classes from './NoDataFound.module.css';

const NoDataFound: React.FC<{message: string, to: string, btnText: string}> = (props) => {
  return (
    <div className={classes.nodata}>
      <p>{props.message}</p>
      <Link className='btn' to={props.to}>
        {props.btnText}
      </Link>
    </div>
  );
};

export default NoDataFound;