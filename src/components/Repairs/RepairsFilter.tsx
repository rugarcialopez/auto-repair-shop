import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import classes from "./RepairsFilter.module.css";


const RepairsFilter = () => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let date = '';
  let time = '';
  let repairState = '';
  if (queryParams.get('date')) {
    date = queryParams.get('date') as string;
  }
  if (queryParams.get('time')) {
    time = queryParams.get('time') as string;
  }
  if (queryParams.get('repairState')) {
    repairState = queryParams.get('repairState') as string;
  }
  
  let dateRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  let timeRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  let repairStateRef = React.useRef() as React.MutableRefObject<HTMLSelectElement>;

  useEffect(() => {
    dateRef.current.value = date;
    timeRef.current.value = `${time}:00`;
    repairStateRef.current.value = repairState;
  }, [date, time, repairState]);


  const filterByHandler = () => {
    let filter = {};
    filter = dateRef.current.value ? {...filter, date: dateRef.current.value } : filter;
    filter = timeRef.current.value ? {...filter, time: timeRef.current.value.split(':')[0] } : filter;
    filter = repairStateRef.current.value ? {...filter, repairState: repairStateRef.current.value } : filter;
    const searchParams = '?' + new URLSearchParams(filter).toString();
    history.push({
      pathname: location.pathname,
      search: searchParams
    });
  }

  return (
    <div className={classes.filters}>
      <label htmlFor='filterby'>Filter by:</label>
      <input type='date' id='date-filter' aria-label='date-filter-input' onChange={filterByHandler} ref={dateRef}/>
      <input type='time' id='time-filter' aria-label='time-filter-input' onChange={filterByHandler} ref={timeRef} min='09:00' max='18:00' step='3600'/>
      <select ref={repairStateRef} onChange={filterByHandler} id='repairState-filter' aria-label='repairState-filter-select'>
        <option value="">--Select a state--</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">uncompleted</option>
      </select>
    </div>
  )
}

export default RepairsFilter;