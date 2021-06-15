import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import UserForm from "../components/Users/UserForm";
import User from "../models/User";
import AuthContext from "../store/auth-context";

const EditUserPage = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    id: '',
    password: '',
    fullName: '',
    email:'',
    role: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const authContext = useContext(AuthContext);
  const params: { id: string} = useParams();
  const { id } = params;
  const token = authContext.token;
  const getUser = useCallback(async () => {
    try {
      setStatus('pending');
      setIsLoading(true);
      const response = await fetch(`http://localhost:4000/api/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'token': token
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
      } else {
        throw Error(data.message || response.statusText);
      }
      setStatus('completed');
      setIsLoading(false);
    } catch (error) {
      setStatus('completed');
      setIsLoading(false);
      alert(error);
    }
  }, [id, token]);

  useEffect(() => {
   getUser(); 
  }, [getUser])

  const updateUserHandler = async(updatedUser: User) => {
    const token = authContext.token;
    try {
      const response = await fetch(`http://localhost:4000/api/edit-user/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedUser),
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

  return (
    <Fragment>
      { isLoading && <LoadingSpinner /> }
      { status === 'completed' && <UserForm user={user} onSubmit={updateUserHandler}/> }
    </Fragment>
  )
}

export default EditUserPage;