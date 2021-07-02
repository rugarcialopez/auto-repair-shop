import { useContext } from "react";
import { useHistory } from "react-router";
import UserForm from "../components/Users/UserForm";
import useHttp from "../hooks/use-http";
import { addUser } from "../lib/api";
import User from "../models/User";
import AuthContext from "../store/auth-context";

const NewUserPage = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const { sendRequest: addUserRequest, status: addUserStatus, error: addUserError } = useHttp<User, {fullName: string, email: string, role: string, password: string}>(addUser);
  const addUserHandler = async(newUser: User) => {
    const token = authContext.token;
    addUserRequest({
      token,
      body: {
        fullName: newUser.fullName,
        password: newUser.password || '',
        role: newUser.role,
        email: newUser.email
      }
    });
  }

  if (addUserStatus === 'completed' && !addUserError) {
    history.push('/users');
  }

  return <UserForm onSubmit={addUserHandler} />
}

export default NewUserPage;