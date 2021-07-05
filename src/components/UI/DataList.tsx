import { Fragment, useContext } from "react";
import classes from './DataList.module.css';
import Data from '../../models/Data';
import { Link } from "react-router-dom";
import DataItem from "./DataItem";
import AuthContext from "../../store/auth-context";

const DataList: React.FC<{ data: Data[], to: string, btnText: string, onRemove: (id: string) => void}> = (props) => {
  const authContext =  useContext(AuthContext);
  return (
    <Fragment>
      <ul className={classes.list}>
        {props.data.map((data: Data) => <DataItem  data={data} key={data.id} onRemove={props.onRemove}/>)}
      </ul>
      { authContext.role === 'manager' && <div className='centered'>
        <Link className='btn' to={props.to}>
          {props.btnText}
        </Link>
      </div> }
    </Fragment>
  )
}

export default DataList;