import { useCallback, useContext, useEffect } from "react";
import DataList from "../components/UI/DataList";
import Data from '../models/Data';
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoDataFound from "../components/UI/NoDataFound";
import useHttp from "../hooks/use-http";
import { getAllUsers } from "../lib/api";
import AuthContext from "../store/auth-context"
import Modal from "../components/UI/Modal";

const UsersPage = () => {
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const { sendRequest, data, status, error, removeError, isLoading } = useHttp<Data[], {}>(getAllUsers);

  useEffect(() => {
    sendRequest({token});
  }, [ token, sendRequest ]);

  const removedHandler = useCallback(() => {
    sendRequest({token});
  }, [sendRequest, token])

  if (isLoading) {
    return <LoadingSpinner/>
  }

  if (error) {
    return <Modal onClose={removeError}>{error}</Modal>
  }

  if (status === 'completed' && (!data || data.length === 0)) {
    return <NoDataFound message='No users found!' to='/new-user' btnText='Add a User'/>
  }

  return <DataList data={data || []} to='/new-user' btnText='Add a user' onRemoved={removedHandler}/>
}

export default UsersPage;