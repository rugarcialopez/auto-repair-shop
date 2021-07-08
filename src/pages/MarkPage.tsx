import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import Mark from "../components/Repairs/Mark"
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getMark } from "../lib/api";
import AuthContext from "../store/auth-context";

const MarkPage = () => {
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const params: { id: string} = useParams();
  const { id } = params;
  const { sendRequest: getMarkRequest, data: getMarkData, status: getMarkStatus, error: getMarkError } = useHttp<{repairState: string, description: string}, {}>(getMark);


  useEffect(() => {
    getMarkRequest({token, id });
  }, [ getMarkRequest, token, id])

  if (getMarkStatus === 'completed' && getMarkError) {
    return <p className='centered'>{getMarkError}</p>
  }

  if (getMarkStatus === 'completed' && !getMarkError) {
    return <Mark repairState={getMarkData?.repairState || ''} repairDescription={getMarkData?.description || ''}/>
  }
  return <LoadingSpinner/>
}

export default MarkPage;