import { useContext, useEffect, useState, useCallback } from "react";
import RepairList from "../components/Repairs/RepairList";
import AuthContext from "../store/auth-context";

const RepairsPage = () => {
  const authContext = useContext(AuthContext);
  const [repairsList, setRepairsList ] = useState([]);
  const token = authContext.token;
  const getRepairs = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:4000/api/repairs', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'token': token
        }
      });
      const data = await response.json();
      if (response.ok) {
        setRepairsList(data.repairs);
      } else {
        throw Error(data.message || response.statusText);
      } 
    } catch (error) {
      alert(error);
    }
  }, [token]);

  useEffect(() => {
    getRepairs();
  }, [getRepairs]);

  return <RepairList repairsList={repairsList}/>
}

export default RepairsPage;