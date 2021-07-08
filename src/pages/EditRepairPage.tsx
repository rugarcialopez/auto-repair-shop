import { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import RepairForm from "../components/Repairs/RepairForm";
import useHttp from "../hooks/use-http";
import Repair, { RepairObj } from "../models/Repair";
import AuthContext from "../store/auth-context";
import { getRepair, updateRepair } from  "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const EditRepairPage = () => {
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const history = useHistory();
  const { sendRequest: getRepairRequest, data: getRepairData, status: getRepairStatus, error: getRepairError } = useHttp<RepairObj, {}>(getRepair);
  const { sendRequest: updateRepairRequest, status: updateRepairStatus, error: updateRepairError } = useHttp<{message: string}, {description: string, date: string, time: number, userId: string}>(updateRepair);

  const params: { id: string} = useParams();
  const { id } = params;

  useEffect(() => {
    getRepairRequest({token, id });
  }, [ getRepairRequest, token, id])

  const updateRepairHandler = (updatedRepair: Repair) => {
    updateRepairRequest({token, id, body: updatedRepair});
  }

  if (getRepairStatus === 'completed' && getRepairError) {
    return <p className='centered'>{getRepairError}</p>
  }

  if (updateRepairStatus === 'completed' && updateRepairError) {
    return <p className='centered'>{updateRepairError}</p>
  }

  if (updateRepairStatus === 'completed' && !updateRepairError) {
    history.push('/repairs');
  }

  if (getRepairStatus === 'completed' && getRepairData?.repair && getRepairData.users.length > 0) {
    return <RepairForm onSubmit={updateRepairHandler} repair={getRepairData.repair} users={getRepairData.users}/>
  }
  return <LoadingSpinner />
}

export default EditRepairPage;