import React from 'react';
import { Link } from 'react-router-dom';

import classes from './UserItem.module.css';

const UserItem: React.FC<{fullName: string, id: string, role: string, onRemove: (id: string) => void }> = (props) => {
  console.log('[UserItem]');
  const removeHanler = () => {
    if (window.confirm('Remove the user?')) {
      props.onRemove(props.id)
    }
  }
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.fullName}</p>
        </blockquote>
        <figcaption>{props.role}</figcaption>
      </figure>
      <button onClick={removeHanler} className='btn'>Remove</button>
      <Link className='btn' to={`/users/${props.id}`}>
        View Fullscreen
      </Link>
    </li>
  );
};

export default React.memo(UserItem);