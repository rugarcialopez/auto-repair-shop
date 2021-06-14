import UserList from "../components/Users/UserList";
import User from "../models/User";

const UsersPage = () => {

  const usersList: User[] = [];

  return <UserList usersList={usersList}/>
}

export default UsersPage;