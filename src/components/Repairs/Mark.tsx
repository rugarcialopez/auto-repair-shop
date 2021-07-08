import { useContext, useEffect, useState } from 'react';
import { markRepair } from '../../lib/api';
import { useLocation, useParams, useRouteMatch } from 'react-router';
import useHttp from '../../hooks/use-http';
import AuthContext from '../../store/auth-context';
import classes from './Mark.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';

const Mark = () => {
  console.log('Mark component');
  const authContext = useContext(AuthContext);
  const {sendRequest: markRequest, status: markStatus, error: markError, isLoading: isLoadingMark} = useHttp<{message: string}, {userId: string, repairState: string}>(markRepair);
  const userId = authContext.userId;
  const token = authContext.token;
  const params: { id: string} = useParams();
  // const id = params.id;
  // authContext.
  // const routeMatch = useRouteMatch();
  const location = useLocation();

  const [repairState, setRepairState] = useState('');

  useEffect(()=> {
    console.log('useEffect');
    const queryParams = new URLSearchParams(location.search);
    const repairStateParam = queryParams.get('repairState');
    if (repairStateParam) {
      setRepairState(repairStateParam);
    }
  }, [location.search]);

  const markClickHandler = () => {
    markRequest({token, id: params.id, body: { userId, repairState } });
  }

  const markdChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('markdChangeHandler');
    setRepairState(event.target.value);
  }

  return (
    <div className={classes.mark}>
      <h1>Mark repair</h1>
      { isLoadingMark && <LoadingSpinner/> } 
      { markStatus === 'completed' && !markError && <p>You have marked this repair</p> } 
      { markStatus === 'completed' && markError && <p>{markError}</p> } 
      <select id="mark-state" onChange={markdChangeHandler} value={repairState}>
        <option value="">Choose a state</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
        { authContext.role === 'manager' && <option value="approved">Approved</option> }
      </select>
      <div className={classes.actions}>
        <button type='button' onClick={markClickHandler} disabled={repairState === ''}>Mark</button>
      </div>
    </div>
  )
}

export default Mark;