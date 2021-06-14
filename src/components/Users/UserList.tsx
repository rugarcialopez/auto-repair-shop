import { Fragment } from "react";
import classes from './UserList.module.css';
import NoUsersFound from './NoUsersFound';
import UserItem from "./UserItem";

type UserDetail = {
  id: string,
  role: string,
  fullName: string,
  email: string;
};

const UserList: React.FC<{ usersList: UserDetail[]}> = (props) => {
  if (props.usersList.length === 0) {
    return <NoUsersFound />
  }
  return (
    <Fragment>
      <ul className={classes.list}>
        {props.usersList.map(user => <UserItem fullName={user.fullName} id={user.id} key={user.id} role={user.role}/>)}
      </ul>
    </Fragment>
  )
}

export default UserList;