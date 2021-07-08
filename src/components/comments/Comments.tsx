import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useHttp from '../../hooks/use-http';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import {getAllComments} from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';
import AuthContext from '../../store/auth-context';

const Comments = () => {
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const params: { id: string} = useParams();
  const { id } = params;
  const { sendRequest, status, data: loadedComments } = useHttp<string[], {}>(getAllComments);
  const [isAddingComment, setIsAddingComment] = useState(false);

  useEffect(() => {
    sendRequest({token, id});
  }, [id, token, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest({token, id});
  }, [sendRequest,token,  id]);
  
  let comments;

  if (status === 'pending') {
    comments = <LoadingSpinner marginLeft='0'/>;
  }

  if (status === 'completed' && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments}/>
  }

  if (status === 'completed' && (!loadedComments || loadedComments.length === 0)) {
    comments = <p className='centered'>
    No comments were added yet
  </p>
  }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {status === 'completed' && !isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm repairId={params.id} onAddedComment={addedCommentHandler}/>}
      {comments}
    </section>
  );
};

export default Comments;
