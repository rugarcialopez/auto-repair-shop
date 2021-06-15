import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoUsersFound from "../components/Users/NoUsersFound";
import UserList from "../components/Users/UserList";
import AuthContext from "../store/auth-context";

const UsersPage = () => {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const authContext = useContext(AuthContext);
  const token = authContext.token;

  const getUsers = useCallback(async () => {
    try {
      setStatus('pending');
      setIsLoading(true);
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
      setIsLoading(false);
      setStatus('completed');
    } catch (error) {
      setIsLoading(false);
      setStatus('completed');
      alert(error);
    }
  }, [token]);

  useEffect(() => {
    getUsers()
  }, [getUsers]);

  const removeHandler = useCallback(async(id: string) => {
    try {
      setStatus('pending');
      setIsLoading(true);
      const response = await fetch(`http://localhost:4000/api/delete-user/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'token': token
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUsersList(data.users);
      } else {
        throw Error(data.message || response.statusText)
      }
      setIsLoading(false);
      setStatus('completed');
    } catch (error) {
      setIsLoading(false);
      setStatus('completed');
      alert(error);
    }
  }, [token]);

  return (
    <Fragment>
      { status === 'completed' && usersList.length !== 0 && <UserList usersList={usersList} onRemove={removeHandler}/> }
      { status === 'completed' && usersList.length === 0 && <NoUsersFound/> }
      { isLoading && <LoadingSpinner/> }
    </Fragment>
  )
}

export default UsersPage;