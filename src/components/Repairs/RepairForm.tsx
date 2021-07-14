import React, { useContext, useEffect, useState } from 'react';
import useInput from '../../hooks/use-input';
import { checkAvailability } from '../../lib/api';
import Repair from '../../models/Repair';
import AuthContext from '../../store/auth-context';
import classes from './RepairForm.module.css';

const isNotEmpty = (value: string) => value.trim() !== '';

const RepairForm: React.FC<{
  onSubmit: (repair: Repair) => void,
  users: {id: string, fullName: string, role: string}[] | null,
  repair?: { id: string, description: string, date: string, time: number, userId: string }
  }> = (props) => {

  const authContext = useContext(AuthContext);
  const token = authContext.token;

  const id = props.repair ? props.repair.id : null;
  const description = props.repair ? props.repair.description : null;
  const date = props.repair ? props.repair.date : null;
  const time = props.repair ? props.repair.time : null;
  const userId = props.repair ? props.repair.userId : null;
  const [isTimeAvailable, setIsTimeAvailable] = useState(false);
  const [timeError, setTimeError] = useState('');
  
  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHanlder,
    set: setDescription,
  } = useInput(isNotEmpty);

  const {
    value: enteredDate,
    isValid: enteredDateIsValid,
    hasError: dateHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHanlder,
    set: setDate
  } = useInput(isNotEmpty);

  const {
    value: enteredTime,
    isValid: enteredTimeIsValid,
    hasError: timeHasError,
    valueChangeHandler: timeChangeHandler,
    inputBlurHandler: timeBlurHanlder,
    set: setTime
  } = useInput(isNotEmpty);

  const {
    value: enteredUser,
    isValid: enteredUserIsValid,
    hasError: userHasError,
    valueChangeHandler: userChangeHandler,
    inputBlurHandler: userBlurHanlder,
    set: setUser
  } = useInput(isNotEmpty);

  useEffect(() => {
    if (description && date && time && userId) {
      setDescription(description);
      setDate(date);
      setTime(`${time.toString()}:00`);
      setUser(userId);
    }
  }, [description, time, date, userId, setDescription, setDate, setTime, setUser])

  useEffect(() => {
    if (id && parseInt(enteredTime.split(':')[0]) === time) {
      setIsTimeAvailable(true);
    } else {
      setIsTimeAvailable(false);
    }
    setTimeError('');
  }, [id, time, enteredTime]);

  let formIsValid = enteredDescriptionIsValid && enteredTimeIsValid && enteredDateIsValid && enteredUserIsValid && isTimeAvailable;

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    let repair: Repair = {
      description: enteredDescription,
      date: enteredDate,
      time: parseInt(enteredTime.split(':')[0]),
      userId: enteredUser
    }
    if (id) {
      repair = {...repair, id: id};
    }
    props.onSubmit(repair);
  }

  const checkAvailabilityHandler = async () => {
    if (enteredTime === '' || !enteredDate) {
      setIsTimeAvailable(false);
      setTimeError('Date and time are required');
      return;
    }
    try {
      const response = await checkAvailability({token, date: enteredDate, time: enteredTime});
      if(response) {
        setIsTimeAvailable(true);
        alert('Time is available');
      } else {
        setIsTimeAvailable(false);
        setTimeError('Time is not available');
      }
    } catch (error) {
      setIsTimeAvailable(false);
      setTimeError(error.message);
    }

  }


  const descriptionClasses = !descriptionHasError ? classes.control : classes.control + ' ' + classes.invalid;
  const dateClasses = !dateHasError ? classes.control : classes.control + ' ' + classes.invalid;
  const timeClasses = !timeHasError ? classes.control + ' ' + classes.time  : classes.control +  ' ' + classes.time + ' '+ classes.invalid;
  const userClasses = !userHasError ? classes.control : classes.control + ' ' + classes.invalid;

  return (
    <section className={classes.repairForm}>
      <h1>Repair form</h1>
      <form onSubmit={submitHandler}>
        <div className={descriptionClasses}>
          <label htmlFor='description'>Description</label>
          <input type='text' id='description' value={enteredDescription} onChange={descriptionChangeHandler} onBlur={descriptionBlurHanlder} aria-label='description-textarea'/>
          {descriptionHasError && <p className={classes['error-text']}>Please enter a description.</p>}
        </div>
        <div className={dateClasses}>
          <label htmlFor='date'>Date</label>
          <input type='date' id='date' value={enteredDate} onChange={dateChangeHandler} onBlur={dateBlurHanlder} aria-label='date-input'/>
          {dateHasError && <p className={classes['error-text']}>Please enter a date.</p>}
        </div>
        <div className={timeClasses}>
          <label htmlFor='time'>Choose a repair time (opening hours 09:00 to 18:00)</label>
          <input type='time' id='time' value={enteredTime} onChange={timeChangeHandler} onBlur={timeBlurHanlder} min='09:00' max='18:00' step='3600' aria-label='time-input'/>
          <button className='btn' type='button' onClick={checkAvailabilityHandler} disabled={isTimeAvailable}>Check availability</button>
          {!isTimeAvailable && <p className={classes['error-text']}>{timeError}</p> }
          {timeHasError && <p className={classes['error-text']}>Please enter a time.</p>}
        </div>
        <div className={userClasses}>
          <label htmlFor='user'>Choose a user for this repair</label>
          <select value={enteredUser} onChange={userChangeHandler} onBlur={userBlurHanlder}>
            <option value="">--Please choose a user--</option>
            { props.users?.map(user => <option value={user.id} key={user.id}>{user.fullName}</option>)}
          </select>
          {userHasError && <p className={classes['error-text']}>Please select a user.</p>}
        </div>
        <div className={classes.actions}>
          <button type='submit' disabled={!formIsValid}>{props.repair ? 'Update repair': 'Add repair'}</button>
        </div>
      </form>
    </section>
  );
};

export default RepairForm;
