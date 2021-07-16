import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import RepairForm from "../components/Repairs/RepairForm";
import useHttp from "../hooks/use-http";
import { RepairObj } from "../models/Repair";
import AuthContext from "../store/auth-context";
import { getRepair } from  "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Modal from "../components/UI/Modal";

const EditRepairPage = () => {
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const { sendRequest, data, error, isLoading, removeError } = useHttp<RepairObj, {}>(getRepair);

  const params: { id: string} = useParams();
  const { id } = params;

  useEffect(() => {
    sendRequest({token, id });
  }, [ sendRequest, token, id]);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (error) {
    return <Modal onClose={removeError}>{error}</Modal>;
  }

  
  return <RepairForm repair={data?.repair} users={data?.users || []}/>
}

export default EditRepairPage;