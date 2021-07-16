import { Fragment, useCallback, useContext, useEffect } from "react";
import DataList from "../components/UI/DataList";
import Data from '../models/Data';
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoDataFound from "../components/UI/NoDataFound";
import useHttp from "../hooks/use-http";
import { getRepairs } from "../lib/api";
import AuthContext from "../store/auth-context";
import RepairsFilter from "../components/Repairs/RepairsFilter";
import { useLocation } from "react-router";
import Modal from "../components/UI/Modal";

const RepairsPage = () => {
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get('date') ? queryParams.get('date') : null;
  const time = queryParams.get('time') ? queryParams.get('time') : null;
  const repairState = queryParams.get('repairState') ? queryParams.get('repairState') : null;
  const token = authContext.token;
  const { 
    sendRequest,
    data,
    status,
    error,
    isLoading,
    removeError
  } = useHttp<Data[], {}>(getRepairs);
  
  useEffect(() => {
    sendRequest({token});
  }, [sendRequest, token]);

  const removedHandler = useCallback(() => {
    sendRequest({token});
  }, [sendRequest, token]);

  const isEmpty = (list: Data[] | null): boolean => {
    return !list || list.length === 0;
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

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <Modal onClose={removeError}>{error}</Modal>
  }

  if (status === 'completed' && isEmpty(data)) {
    return <NoDataFound message='No repairs found!' to='/new-repair' btnText='Add a Repair'/>
  }

  const repairsFiltered = filterRepairsBy(data || []);
  return (
    <Fragment>
      <RepairsFilter></RepairsFilter>
      { repairsFiltered.length > 0 && <DataList data={repairsFiltered} to='/new-repair' btnText='Add a repair' onRemoved={removedHandler}/> }
      { repairsFiltered.length === 0 && <NoDataFound message='No repairs found!' to='/new-repair' btnText='Add a Repair'/> }
    </Fragment>
  )

}

export default RepairsPage;