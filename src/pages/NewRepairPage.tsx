import { useContext, useEffect } from "react";
import RepairForm from "../components/Repairs/RepairForm";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Modal from "../components/UI/Modal";
import useHttp from "../hooks/use-http";
import { getAllUsers } from "../lib/api";
import AuthContext from "../store/auth-context";

const NewRepairPage = () => {
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const { sendRequest, data, error, isLoading, removeError } = useHttp<{id: string, fullName: string, role: string}[], {}>(getAllUsers);

  useEffect(() => {
    sendRequest({token, role: 'user'})
  }, [ token, sendRequest ]);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (error) {
    return <Modal onClose={removeError}>{error}</Modal>;
  }

  
  return <RepairForm users={data}/>

  // const addRepairHandler = async(repair: Repair) => {
  //   addRepairRequest({
  //     token,
  //     body: {
  //       description: repair.description,
  //       date: repair.date,
  //       time: repair.time,
  //       userId: repair.userId
  //     }
  //   });
  // }

  // if (addRepairError) {
  //   alert(addRepairError);
  // }

  // if (addRepairStatus === 'completed' && !addRepairError) {
  //   history.push('/repairs');
  // }

  // if (getAllUsersStatus === 'completed' && !getAllUsersError) {
  //   return <RepairForm onSubmit={addRepairHandler} users={allUsers}/>
  // }

  // return <LoadingSpinner/>

}

export default NewRepairPage;