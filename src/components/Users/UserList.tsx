import User from "../../models/User";
import NoUsersFound from "./NoUsersFound";


const UserList: React.FC<{ usersList: User[]}> = (props) => {
  if (props.usersList.length === 0) {
    return <NoUsersFound />
  }
  return <p>Users List</p>
}

export default UserList;