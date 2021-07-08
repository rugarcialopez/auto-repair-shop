import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import  Data from '../../models/Data';
import AuthContext from '../../store/auth-context';
import classes from './DataItem.module.css';

const DataItem: React.FC<{data: Data, onRemove: (id: string) => void }> = (props) => {
  const authContext = useContext(AuthContext);

  const removeHanler = () => {
    if (window.confirm('Are you sure?')) {
      props.onRemove(props.data.id)
    }
  }
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          { props.data.fullName &&  <p>{props.data.fullName}</p> }
          { props.data.description && <p>{props.data.description}</p> }
        </blockquote>
        { props.data.role &&  <figcaption>{props.data.role}</figcaption>}
        { props.data.date && <figcaption>Date: {props.data.date}</figcaption> }
        { props.data.time && <figcaption>Time: { props.data.time}{ props.data.time < 12 ? 'am' : 'pm'}</figcaption> }
        { props.data.repairState && <figcaption>State: {props.data.repairState}</figcaption> }
      </figure>
      { authContext.role === 'manager' && <button onClick={removeHanler} className='btn'>Remove</button> }
      { authContext.role === 'manager' && <Link className='btn' to={props.data.date ? `/repairs/${props.data.id}` : `/users/${props.data.id}`}>
        View Fullscreen
      </Link> }
      { props.data.repairState && !(props.data.repairState !== 'uncompleted' && authContext.role === 'user') && <Link className='btn' to={`/repairs/mark/${props.data.id}` }>
        Mark
      </Link> }
    </li>
  );
};

export default React.memo(DataItem);