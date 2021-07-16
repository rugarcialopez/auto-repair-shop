import { Fragment, useContext, useState } from "react";
import classes from './DataList.module.css';
import Data from '../../models/Data';
import { Link } from "react-router-dom";
import DataItem from "./DataItem";
import AuthContext from "../../store/auth-context";
import { removeRepair, removeUser } from "../../lib/api";
import Modal from "./Modal";

const DataList: React.FC<{ data: Data[], to: string, btnText: string, onRemoved: () => void}> = (props) => {
  const [error, setError] = useState(null);
  const authContext =  useContext(AuthContext);
  const token = authContext.token;
  const onRemoveHandler = async (id: string) => {
    setError(null);
    const isRemovingAUser = props.btnText === 'Add a user';
    const fn = isRemovingAUser ? removeUser : removeRepair;
    try {
      await fn({token, id});
      props.onRemoved();
    } catch (error) {
      setError(error.message);
    }
  }

  const closeHandler = () => {
    setError(null);
  }

  return (
    <Fragment>
      { error && <Modal onClose={closeHandler}>{error}</Modal>}
      <ul className={classes.list}>
        {props.data.map((data: Data) => <DataItem  data={data} key={data.id} onRemove={onRemoveHandler.bind(data.id)}/>)}
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