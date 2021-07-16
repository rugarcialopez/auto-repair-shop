import { useContext, useState } from 'react';
import { markRepair } from '../../lib/api';
import { Route, useParams, useRouteMatch } from 'react-router';
import useHttp from '../../hooks/use-http';
import AuthContext from '../../store/auth-context';
import classes from './Mark.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';

const Mark: React.FC<{repairState: string, repairDescription: string}> = (props) => {
  const authContext = useContext(AuthContext);
  const {sendRequest: markRequest, status: markStatus, error: markError, isLoading: isLoadingMark} = useHttp<{message: string}, {userId: string, repairState: string}>(markRepair);
  const userId = authContext.userId;
  const token = authContext.token;
  const params: { id: string} = useParams();
  const routeMatch = useRouteMatch();

  const [repairState, setRepairState] = useState(props.repairState);

  const markClickHandler = () => {
    markRequest({token, id: params.id, body: { userId, repairState } });
  }

  const markdChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRepairState(event.target.value);
  }

  return (
    <div className={classes.mark}>
      <h1>Mark {props.repairDescription}</h1>
      { isLoadingMark && <LoadingSpinner/> } 
      { markStatus === 'completed' && !markError && <p>You have marked this repair</p> } 
      { markStatus === 'completed' && markError && <p>{markError}</p> } 
      <select id="mark-state" onChange={markdChangeHandler} value={repairState}>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
        { authContext.role === 'manager' && <option value="approved">Approved</option> }
      </select>
      <div className='centered'>
        <Route path={routeMatch.path} exact>
          <Link className='btn' to={`${routeMatch.url}/comments`}>
            Load comments
          </Link>
        </Route>
        <Route path={`${routeMatch.path}/comments`}>
          <Comments/>
        </Route>
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={markClickHandler} disabled={repairState === ''}>Mark</button>
      </div>
    </div>
  )
}

export default Mark;