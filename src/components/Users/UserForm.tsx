import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useInput from '../../hooks/use-input';
import { addUser, updateUser } from '../../lib/api';
import User from '../../models/User';
import AuthContext from '../../store/auth-context';
import Modal from '../UI/Modal';
import classes from './UserForm.module.css';

const isNotEmpty = (value: string) => value.trim() !== '';
const isEmail = (value: string) => {
  const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return pattern.test( value );
}

const isCorrectPassword = (value: string) => isNotEmpty(value) && value.length >= 5;

const UserForm: React.FC<{ user?: User}> = (props) => {
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const [error, setError] = useState(null);
  const history = useHistory();
  const fullName = props.user ? props.user.fullName : null;
  const email = props.user ? props.user.email : null;
  const role = props.user ? props.user.role : null;
  const [roleSelected, setRoleSelected] = useState('manager');

  let {
    value: enteredFullName,
    isValid: enteredFullNameIsValid,
    hasError: fullNameInputHasError,
    valueChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameBlurHanlder,
    set: setFullName,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHanlder,
    set: setEmail,
  } = useInput(isEmail);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHanlder,
  } = useInput(isCorrectPassword);

  useEffect(() => {
    if (fullName && email && role) {
      setFullName(fullName);
      setEmail(email);
      setRoleSelected(role);
    }
  }, [fullName, email, role, setFullName, setEmail, setRoleSelected]);

  let formIsValid = !props.user ? enteredFullNameIsValid && enteredEmailIsValid && enteredPasswordIsValid : enteredFullNameIsValid && enteredEmailIsValid;


  const roleChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleSelected(event.target.value);
  }

  const submitHandler = async(event: React.FormEvent) => {
    event.preventDefault();
    try {
      setError(null);
      if (props.user) {
        await updateUser({
          token,
          id: props.user.id,
          body:{
            fullName: enteredFullName,
            email: enteredEmail,
            role: roleSelected
          }
        });
      } else {
        await addUser({
          token,
          body:{
            fullName: enteredFullName,
            email: enteredEmail,
            role: roleSelected,
            password: enteredPassword
          }
        });
      }
      history.push('/users');
    } catch (error) {
      setError(error.message);
    }
  }

  const fullNameClasses = !fullNameInputHasError ? classes.control : classes.control + ' ' + classes.invalid;
  const emailClasses = !emailInputHasError ? classes.control : classes.control + ' ' + classes.invalid;
  const passwordClasses = !passwordInputHasError ? classes.control : classes.control + ' ' + classes.invalid;

  return (
    <Fragment>
      { error && <Modal onClose={() => setError(null)}>{error}</Modal>}
      <section className={classes.userForm}>
        <h1>User form</h1>
        <form onSubmit={submitHandler}>
          <div className={fullNameClasses}>
            <label htmlFor='fullName'>Your full name</label>
            <input type='text' id='fullName' onChange={fullNameChangeHandler} value={enteredFullName} onBlur={fullNameBlurHanlder} aria-label='fullName-input'/>
            {fullNameInputHasError && <p className={classes['error-text']}>Please enter a full name.</p>}
          </div>
          <div className={emailClasses}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' onChange={emailChangeHandler} value={enteredEmail} onBlur={emailBlurHanlder} aria-label='email-input'/>
            {emailInputHasError && <p className={classes['error-text']}>Please enter a valid email address.</p>}
          </div>
          { !props.user && <div className={passwordClasses}>
            <label htmlFor='password'>Your Password</label>
            <input type='password' id='password' onChange={passwordChangeHandler} value={enteredPassword} onBlur={passwordBlurHanlder} aria-label='password-input'/>
            {passwordInputHasError && <p className={classes['error-text']}>Please enter a valid password (min length 5 characters)</p>}
          </div> }
          <div className={classes.control}>
            <label htmlFor='role'>Your role</label>
            <select name='role' id='role' value={roleSelected} onChange={roleChangeHandler}>
              <option value='manager'>Manager</option>
              <option value='user'>User</option>
            </select>
          </div>
          <div className={classes.actions}>
            <button type='submit' disabled={!formIsValid}>{ props.user ? 'Update user' : 'Add user' }</button>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

export default UserForm;
