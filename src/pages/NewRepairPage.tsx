import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import RepairForm from "../components/Repairs/RepairForm";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { addRepair, getAllUsers } from "../lib/api";
import Repair from "../models/Repair";
import AuthContext from "../store/auth-context";

const NewRepairPage = () => {
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const history = useHistory();
  const { sendRequest: getAllUsersRequest, data: allUsers, status: getAllUsersStatus, error: getAllUsersError } = useHttp<{id: string, fullName: string, role: string}[], {}>(getAllUsers);
  const { sendRequest: addRepairRequest, status: addRepairStatus, error: addRepairError } = useHttp<{message: string}, Repair>(addRepair);

  useEffect(() => {
    getAllUsersRequest({token, role: 'user'})
  }, [ token, getAllUsersRequest ]);

  const addRepairHandler = async(repair: Repair) => {
    addRepairRequest({
      token,
      body: {
        description: repair.description,
        date: repair.date,
        time: repair.time,
        userId: repair.userId
      }
    });
  }

  if (addRepairError) {
    alert(addRepairError);
  }

  if (addRepairStatus === 'completed' && !addRepairError) {
    history.push('/repairs');
  }

  if (getAllUsersStatus === 'completed' && !getAllUsersError) {
    return <RepairForm onSubmit={addRepairHandler} users={allUsers}/>
  }

  return <LoadingSpinner/>

}

export default NewRepairPage;