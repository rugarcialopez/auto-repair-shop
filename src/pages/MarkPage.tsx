import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import Mark from "../components/Repairs/Mark"
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getRepair } from "../lib/api";
import { RepairObj } from "../models/Repair";
import AuthContext from "../store/auth-context";

const MarkPage = () => {
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const params: { id: string} = useParams();
  const { id } = params;
  const { sendRequest: getRepairRequest, data: getRepairData, status: getRepairStatus, error: getRepairError } = useHttp<RepairObj, {}>(getRepair);


  useEffect(() => {
    getRepairRequest({token, id });
  }, [ getRepairRequest, token, id])

  if (getRepairStatus === 'completed' && getRepairError) {
    return <p className='centered'>{getRepairError}</p>
  }

  if (getRepairStatus === 'completed' && !getRepairError) {
    return <Mark repairState={getRepairData?.repair.repairState || ''}/>
  }
  return <LoadingSpinner/>
}

export default MarkPage;