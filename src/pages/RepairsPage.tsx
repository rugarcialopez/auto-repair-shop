import { useContext, useEffect } from "react";
import DataList from "../components/UI/DataList";
import Data from '../models/Data';
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoDataFound from "../components/UI/NoDataFound";
import useHttp from "../hooks/use-http";
import { getRepairs, removeRepair } from "../lib/api";
import AuthContext from "../store/auth-context";

const RepairsPage = () => {
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const {sendRequest: getRepairsRequest, data: repairsList, status: getRepairsStatus, error: getRepairsError, isLoading: getRepairsIsLoading } = useHttp<Data[], {}>(getRepairs);
  const {sendRequest: removeRepairRequest, data:removeRepairData, status: removeRepairStatus, error: removeRepairError, isLoading: removeRepairIsLoading } = useHttp<Data[], {}>(removeRepair);
  
  useEffect(() => {
    getRepairsRequest({token});
  }, [getRepairsRequest, token]);

  const removeHandler = (id: string) => {
    removeRepairRequest({token, id});
  }

  if (getRepairsIsLoading || removeRepairIsLoading) {
    return <LoadingSpinner />
  }

  if (getRepairsError || removeRepairError) {
    return <p className='centered'>{getRepairsError || removeRepairError}</p>
  }

  if (removeRepairStatus === 'completed' && (!removeRepairData || removeRepairData.length === 0)) {
    return <NoDataFound message='No repairs found!' to='/new-repair' btnText='Add a Repair'/>
  }

  if (getRepairsStatus === 'completed' && (!repairsList || repairsList.length === 0)) {
    return <NoDataFound message='No repairs found!' to='/new-repair' btnText='Add a Repair'/>
  }

  if (removeRepairStatus === 'completed' && removeRepairData && removeRepairData.length > 0) {
    return <DataList data={removeRepairData} to='/new-repair' btnText='Add a repair' onRemove={removeHandler}/>
  }

  return <DataList data={repairsList || []} to='/new-repair' btnText='Add a repair' onRemove={removeHandler}/>

}

export default RepairsPage;