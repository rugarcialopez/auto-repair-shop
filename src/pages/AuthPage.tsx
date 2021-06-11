import { useContext } from "react";
import { useHistory } from "react-router";
import UserForm from "../components/Users/UserForm";
import User from "../models/User";
import AuthContext from "../store/auth-context";


const AuthPage = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();


  const loginHandler = async (user: User) => {
    console.log('[AuthPage] loginHandler');
    const isLogin = !(user.fullName && user.role);
    let url = 'http://localhost:4000/api/signIn';
    let body: User = {
      email: user.email,
      password: user.password
    }
    if (!isLogin) {
      url = 'http://localhost:4000/api/signUp';
      body = {...body, fullName: user.fullName, role: user.role };
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers:{
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        const expirationTime = new Date(
          new Date().getTime() + (data.expirationTime * 1000)
        );
        console.log(expirationTime);
        authContext.login(data.token, data.role, expirationTime.toISOString());
        history.push('/repairs');
      } else {
        throw Error(data?.message || response.statusText);
      } 
    } catch (error) {
      alert(error);
    }
  }
  return <UserForm onLogin={loginHandler}/>
}

export default AuthPage;