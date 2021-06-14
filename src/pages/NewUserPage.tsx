import { useContext } from "react";
import { useHistory } from "react-router";
import UserForm from "../components/Users/UserForm";
import User from "../models/User";
import AuthContext from "../store/auth-context";

const NewUserPage = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const addUserHandler = async(newUser: User) => {
    const token = authContext.token;
    console.log('addUserHandler');
    try {
      const response = await fetch('http://localhost:4000/api/add-user', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-type': 'application/json',
          'token': token
        }
      });
      const data = await response.json();
      if (response.ok) {
        history.push('/users');
      } else {
        throw Error(data.message || response.statusText)
      } 
    } catch (error) {
      alert(error);
    }
  }

  return <UserForm onAddUser={addUserHandler}/>
}

export default NewUserPage;