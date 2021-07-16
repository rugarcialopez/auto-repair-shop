import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Modal from "../components/UI/Modal";
import UserForm from "../components/Users/UserForm";
import useHttp from "../hooks/use-http";
import { getUser } from "../lib/api";
import User from "../models/User";
import AuthContext from "../store/auth-context";

const EditUserPage = () => {
  const { sendRequest, data, isLoading, error, removeError } = useHttp<User, {}>(getUser);

  const authContext = useContext(AuthContext);
  const params: { id: string} = useParams();
  const { id } = params;
  const token = authContext.token;

  useEffect(() => {
    sendRequest({token, id });
  }, [ sendRequest, token, id]);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (error) {
    return <Modal onClose={removeError}>{error}</Modal>;
  }


  return <UserForm user={data || undefined}/>

}

export default EditUserPage;