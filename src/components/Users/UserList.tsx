import { Fragment } from "react";
import classes from './UserList.module.css';
import UserItem from "./UserItem";
import { Link } from "react-router-dom";

type UserItemObj = {
  id: string,
  role: string,
  fullName: string,
  email: string;
};

const UserList: React.FC<{ usersList: UserItemObj[], onRemove: (id: string) => void}> = (props) => {


  return (
    <Fragment>
      <ul className={classes.list}>
        {props.usersList.map(user => <UserItem fullName={user.fullName} id={user.id} key={user.id} role={user.role} onRemove={props.onRemove}/>)}
      </ul>
      <div className='centered'>
        <Link className='btn' to='/new-user'>
          Add a User
        </Link>
      </div>
    </Fragment>
  )
}

export default UserList;