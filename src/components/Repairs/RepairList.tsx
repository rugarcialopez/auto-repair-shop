import { Fragment } from "react";
import Repair from "../../models/Repair"

const RepairList: React.FC<{repairsList: Repair[]}> = (props) => {
  return (
    <Fragment>
      {props.repairsList.map((repair: Repair) => <p>{repair.description}</p>)}
    </Fragment>
  )
};

export default RepairList;