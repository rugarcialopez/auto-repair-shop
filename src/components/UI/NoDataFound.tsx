import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './NoDataFound.module.css';

const NoDataFound: React.FC<{message: string, to: string, btnText: string}> = (props) => {
  const authContext = useContext(AuthContext);
  return (
    <div className={classes.nodata}>
      <p>{props.message}</p>
      {authContext.role === 'manager' && <Link className='btn' to={props.to}>
        {props.btnText}
      </Link>}
    </div>
  );
};

export default NoDataFound;