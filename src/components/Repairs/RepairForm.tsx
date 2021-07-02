import React, { useEffect, useState } from 'react';
import useInput from '../../hooks/use-input';
import Repair from '../../models/Repair';
import classes from './RepairForm.module.css';

const isNotEmpty = (value: string) => value.trim() !== '';

const RepairForm: React.FC<{
  onSubmit: (repair: Repair) => void,
  users: {id: string, fullName: string, role: string}[] | null,
  repair?: { id: string, description: string, date: string, time: number, userId: string }
  }> = (props) => {

  const id = props.repair ? props.repair.id : null;
  const description = props.repair ? props.repair.description : null;
  const date = props.repair ? props.repair.date : null;
  const time = props.repair ? props.repair.time : null;
  const userId = props.repair ? props.repair.userId : null;
  
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

  let formIsValid = enteredDescriptionIsValid && enteredTimeIsValid && enteredDateIsValid && enteredUserIsValid;

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


  const descriptionClasses = !descriptionHasError ? classes.control : classes.control + ' ' + classes.invalid;
  const dateClasses = !dateHasError ? classes.control : classes.control + ' ' + classes.invalid;
  const timeClasses = !timeHasError ? classes.control : classes.control + ' ' + classes.invalid;
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
          {dateHasError && <p className={classes['error-text']}>Please enter a time.</p>}
        </div>
        <div className={userClasses}>
          <label htmlFor='user'>Choose a user for this repair</label>
          <select value={enteredUser} onChange={userChangeHandler} onBlur={userBlurHanlder}>
            <option value="">--Please choose a user--</option>
            { props.users?.map(user => <option value={user.id}>{user.fullName}</option>)}
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
