import { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import UserForm from "../components/Users/UserForm";
import useHttp from "../hooks/use-http";
import { getUser, updateUser } from "../lib/api";
import User from "../models/User";
import AuthContext from "../store/auth-context";

const EditUserPage = () => {
  const history = useHistory();
  const { sendRequest: getUserRequest, data: getUserData, status: getUserStatus } = useHttp<User, {}>(getUser);
  const { sendRequest: updateUserRequest, status: updateUserStatus, error: updateUserError } = useHttp<{message: string}, {fullName: string, email: string, role: string}>(updateUser);

  const authContext = useContext(AuthContext);
  const params: { id: string} = useParams();
  const { id } = params;
  const token = authContext.token;

  useEffect(() => {
    getUserRequest({ token, id});
  }, [getUserRequest, token, id]);

  const updateUserHandler = async(updatedUser: User) => {
    const token = authContext.token;
    updateUserRequest({token, id, body: updatedUser});
  }

  if (getUserStatus === 'pending') {
    return <LoadingSpinner/>
  }

  if (updateUserStatus === 'completed' && !updateUserError) {
    history.push('/users');
  }

  return <UserForm user={getUserData || undefined} onSubmit={updateUserHandler}/>

}

export default EditUserPage;