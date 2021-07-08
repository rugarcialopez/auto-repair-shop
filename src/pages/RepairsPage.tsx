import { Fragment, useContext, useEffect } from "react";
import DataList from "../components/UI/DataList";
import Data from '../models/Data';
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoDataFound from "../components/UI/NoDataFound";
import useHttp from "../hooks/use-http";
import { getRepairs, removeRepair } from "../lib/api";
import AuthContext from "../store/auth-context";
import RepairsFilter from "../components/Repairs/RepairsFilter";
import { useLocation } from "react-router";

const RepairsPage = () => {
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get('date') ? queryParams.get('date') : null;
  const time = queryParams.get('time') ? queryParams.get('time') : null;
  const repairState = queryParams.get('repairState') ? queryParams.get('repairState') : null;
  const token = authContext.token;
  const {sendRequest: getRepairsRequest, data: repairsList, status: getRepairsStatus, error: getRepairsError, isLoading: getRepairsIsLoading } = useHttp<Data[], {}>(getRepairs);
  const {sendRequest: removeRepairRequest, data:removeRepairData, status: removeRepairStatus, error: removeRepairError, isLoading: removeRepairIsLoading } = useHttp<Data[], {}>(removeRepair);
  
  useEffect(() => {
    getRepairsRequest({token});
  }, [getRepairsRequest, token]);

  const removeHandler = (id: string) => {
    removeRepairRequest({token, id});
  }

  const filterRepairsBy = (repairs: Data[]): Data[] => {
    let repairsFiltered = [...repairs];
    if (date) {
      repairsFiltered = repairsFiltered.filter(repair => repair.date === date);
    }
    if (time) {
      repairsFiltered = repairsFiltered.filter(repair => repair.time === parseInt(time));
    }
    if (repairState) {
      repairsFiltered = repairsFiltered.filter(repair => repair.repairState === repairState);
    }

    return repairsFiltered;
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
    const repairsFiltered = filterRepairsBy(removeRepairData);
    return (
      <Fragment>
        <RepairsFilter></RepairsFilter>
        { repairsFiltered.length > 0 && <DataList data={repairsFiltered} to='/new-repair' btnText='Add a repair' onRemove={removeHandler}/> }
        { repairsFiltered.length === 0 && <NoDataFound message='No repairs found!' to='/new-repair' btnText='Add a Repair'/>}
      </Fragment>
    )
  }
  if (getRepairsStatus !== '') {
    const repairsFiltered = filterRepairsBy(repairsList || []);
    return (
      <Fragment>
        { repairsFiltered.length > 0 && <RepairsFilter></RepairsFilter> }
        { repairsFiltered.length > 0 && <DataList data={repairsFiltered} to='/new-repair' btnText='Add a repair' onRemove={removeHandler}/> }
        { repairsFiltered.length === 0 && <NoDataFound message='No repairs found!' to='/new-repair' btnText='Add a Repair'/> }
      </Fragment>
      )
  }
  return <LoadingSpinner/>

}

export default RepairsPage;