import { useCallback, useContext, useEffect } from "react";
import DataList from "../components/UI/DataList";
import Data from '../models/Data';
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoDataFound from "../components/UI/NoDataFound";
import useHttp from "../hooks/use-http";
import { getAllUsers, removeUser } from "../lib/api";
import AuthContext from "../store/auth-context"

const UsersPage = () => {
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const { sendRequest: getAllUsersRequest, data: allUsers, status: statusAllUsers, error: errorAllUsers } = useHttp<Data[], {}>(getAllUsers);
  let { sendRequest: removeUserRequest, data: newAllUsers, status: statusRemoveUser, error: errorRemoveUser } = useHttp<Data[], {}>(removeUser);

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
    return <NoDataFound message='No users found!' to='/new-user' btnText='Add a User'/>
  }

  if (statusRemoveUser === 'completed' && (!newAllUsers || newAllUsers.length === 0)) {
    return <NoDataFound message='No users found!' to='/new-user' btnText='Add a User'/>
  }

  if(statusRemoveUser === 'completed' && newAllUsers && newAllUsers.length > 0) {
    return <DataList data={newAllUsers} to='/new-user' btnText='Add a user' onRemove={removeHandler}/>
  }

  return <DataList data={allUsers || []} to='/new-user' btnText='Add a user' onRemove={removeHandler}/>
}

export default UsersPage;