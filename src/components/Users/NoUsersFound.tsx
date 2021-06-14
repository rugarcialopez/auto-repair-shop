import { Link } from 'react-router-dom';

import classes from './NoUsersFound.module.css';

const NoUsersFound = () => {
  return (
    <div className={classes.nousers}>
      <p>No users found!</p>
      <Link className='btn' to='/new-user'>
        Add a User
      </Link>
    </div>
  );
};

export default NoUsersFound;