import { Fragment } from "react";
import classes from './DataList.module.css';
import Data from '../../models/Data';
import { Link } from "react-router-dom";
import DataItem from "./DataItem";

const DataList: React.FC<{ data: Data[], to: string, btnText: string, onRemove: (id: string) => void}> = (props) => {
  return (
    <Fragment>
      <ul className={classes.list}>
        {props.data.map((data: Data) => <DataItem  data={data} key={data.id} onRemove={props.onRemove}/>)}
      </ul>
      <div className='centered'>
        <Link className='btn' to={props.to}>
          {props.btnText}
        </Link>
      </div>
    </Fragment>
  )
}

export default DataList;