import { useCallback, useContext, useEffect, useState } from "react";
import UserList from "../components/Users/UserList";
import AuthContext from "../store/auth-context";

const UsersPage = () => {
  const [usersList, setUsersList] = useState([]);
  const authContext = useContext(AuthContext);
  const token = authContext.token;

  const getUsers = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'token': token
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUsersList(data.users);
      } else {
        throw Error(data.message || response.statusText);
      } 
    } catch (error) {
      alert(error);
    }
  }, [token]);

  useEffect(() => {
    getUsers()
  }, [getUsers]);

  return <UserList usersList={usersList}/>
}

export default UsersPage;