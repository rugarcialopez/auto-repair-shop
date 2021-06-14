import React, { useState } from 'react';
import useInput from '../../hooks/use-input';
import User from '../../models/User';
import classes from './UserForm.module.css';

const isNotEmpty = (value: string) => value.trim() !== '';
const isEmail = (value: string) => {
  const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return pattern.test( value );
}

const isCorrectPassword = (value: string) => isNotEmpty(value) && value.length >= 5;

const UserForm: React.FC<{ onAddUser: (newUser: User) => void}> = (props) => {
  const [roleSelected, setRoleSelected] = useState('manager');

  const {
    value: enteredFullName,
    isValid: enteredFullNameIsValid,
    hasError: fullNameInputHasError,
    valueChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameBlurHanlder,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHanlder,
  } = useInput(isEmail);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHanlder,
  } = useInput(isCorrectPassword);

  let formIsValid = enteredFullNameIsValid && enteredEmailIsValid && enteredPasswordIsValid;

  const roleChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleSelected(event.target.value);
  }

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    props.onAddUser({
      fullName: enteredFullName,
      email: enteredEmail,
      password: enteredPassword,
      role: roleSelected
    });
  }

  const fullNameClasses = !fullNameInputHasError ? classes.control : classes.control + ' ' + classes.invalid;
  const emailClasses = !emailInputHasError ? classes.control : classes.control + ' ' + classes.invalid;
  const passwordClasses = !passwordInputHasError ? classes.control : classes.control + ' ' + classes.invalid;

  return (
    <section className={classes.userForm}>
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
        <div className={passwordClasses}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' onChange={passwordChangeHandler} value={enteredPassword} onBlur={passwordBlurHanlder} aria-label='password-input'/>
          {passwordInputHasError && <p className={classes['error-text']}>Please enter a valid password (min length 5 characters)</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor='role'>Your role</label>
          <select name='role' id='role' value={roleSelected} onChange={roleChangeHandler}>
            <option value='manager'>Manager</option>
            <option value='user'>User</option>
          </select>
        </div>
        <div className={classes.actions}>
          <button type='submit' disabled={!formIsValid}>Add user</button>
        </div>
      </form>
    </section>
  );
};

export default UserForm;