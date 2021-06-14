
import { Link } from 'react-router-dom';

import classes from './UserItem.module.css';

const UserItem: React.FC<{fullName: string, id: string, role: string}> = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.fullName}</p>
        </blockquote>
        <figcaption>{props.role}</figcaption>
      </figure>
      <Link className='btn' to={`/users/${props.id}`}>
        View Fullscreen
      </Link>
    </li>
  );
};

export default UserItem;