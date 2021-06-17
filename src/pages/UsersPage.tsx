import { useCallback, useContext, useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoUsersFound from "../components/Users/NoUsersFound";
import UserList from "../components/Users/UserList";
import useHttp from "../hooks/use-http";
import { getAllUsers, removeUser } from "../lib/api";
import AuthContext from "../store/auth-context";

type UserItemObj = {
  id: string,
  role: string,
  fullName: string,
  email: string;
};

const UsersPage = () => {
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const { sendRequest: getAllUsersRequest, data: allUsers, status: statusAllUsers, error: errorAllUsers } = useHttp<UserItemObj[]>(getAllUsers);
  let { sendRequest: removeUserRequest, data: newAllUsers, status: statusRemoveUser, error: errorRemoveUser } = useHttp<UserItemObj[]>(removeUser);

  useEffect(() => {
    getAllUsersRequest({token})
  }, [ token, getAllUsersRequest ]);

  const removeHandler = useCallback(async(id: string) => {
    removeUserRequest({token, id});
  }, [removeUserRequest, token]);

  if (statusAllUsers === 'pending' || statusRemoveUser === 'pending') {
    return <LoadingSpinner/>
  }

  if (errorAllUsers || errorRemoveUser) {
    return <p className='centered'>{errorAllUsers || errorRemoveUser}</p>
  }

  if (statusAllUsers === 'completed' && (!allUsers || allUsers.length === 0)) {
    return <NoUsersFound/>
  }

  if (statusRemoveUser === 'completed' && (!newAllUsers || newAllUsers.length === 0)) {
    return <NoUsersFound/>
  }

  if(statusRemoveUser === 'completed' && newAllUsers && newAllUsers.length > 0) {
    return <UserList usersList={newAllUsers} onRemove={removeHandler}/>
  }

  return <UserList usersList={allUsers || []} onRemove={removeHandler}/>
}

export default UsersPage;