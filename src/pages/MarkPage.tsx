import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import Mark from "../components/Repairs/Mark"
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Modal from "../components/UI/Modal";
import useHttp from "../hooks/use-http";
import { getMark } from "../lib/api";
import AuthContext from "../store/auth-context";

const MarkPage = () => {
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const params: { id: string} = useParams();
  const { id } = params;
  const { sendRequest, data, isLoading, error, removeError } = useHttp<{repairState: string, description: string}, {}>(getMark);


  useEffect(() => {
    sendRequest({token, id });
  }, [ sendRequest, token, id]);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (error) {
    return <Modal onClose={removeError}>{error}</Modal>;
  }

  return <Mark repairState={data?.repairState || ''} repairDescription={data?.description || ''}/>
}

export default MarkPage;