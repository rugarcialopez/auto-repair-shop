import { Fragment, useContext } from "react";
import { useHistory } from "react-router";
import AuthForm from "../components/Auth/AuthForm";
import Modal from "../components/UI/Modal";
import useHttp from "../hooks/use-http";
import { signIn, signUp } from "../lib/api";
import AuthUser from "../models/AuthUser";
import AuthContext from "../store/auth-context";

type Login = {
  token: string,
  role: string,
  expirationTime: number
  userId: string;
}

const AuthPage = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const { sendRequest: signInRequest, data: signInData, status: signInStatus, error: signInError, removeError: removeSignInError } = useHttp<Login, { password: string, email: string }>(signIn);
  const { sendRequest: signUpRequest, data: signUpData, status: signUpStatus, error: signUpError, removeError: removeSignUpError } = useHttp<Login, { fullName: string, password: string, role: string, email: string }>(signUp);

  const closeHandler = () => {
    if (signInError) {
      removeSignInError();
    }
    if (signUpError) {
      removeSignUpError();
    }
  }

  const loginHandler = async (user: AuthUser) => {
    const isLogin = !(user.fullName && user.role);
    
    if (!isLogin) {
      signUpRequest({
        body: {
          email: user.email,
          password: user.password,
          role: user.role || '',
          fullName: user.fullName || ''
        }
      });
    } else {
      signInRequest({
        body: {
          email: user.email,
          password: user.password,
        }
      });
    }
  }

  if (signInStatus === 'completed' && signInData) {
    const expirationTime = new Date(
      new Date().getTime() + (signInData.expirationTime * 1000)
    );
    authContext.login(signInData.token, signInData.role, expirationTime.toISOString(), signInData.userId);
    history.push('/repairs');
  }

  if (signUpStatus === 'completed' && signUpData) {
    const expirationTime = new Date(
      new Date().getTime() + (signUpData.expirationTime * 1000)
    );
    authContext.login(signUpData.token, signUpData.role, expirationTime.toISOString(), signUpData.userId);
    history.push('/repairs');
  }

  return (
    <Fragment>
      {(signUpError || signInError) && <Modal onClose={closeHandler}>{signUpError || signInError}</Modal>}
      <AuthForm onLogin={loginHandler}/>
    </Fragment> 
  )
}

export default AuthPage;