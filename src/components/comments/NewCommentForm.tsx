import React, { useRef, useEffect, useContext } from 'react';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
import AuthContext from '../../store/auth-context';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './NewCommentForm.module.css';

const NewCommentForm: React.FC<{repairId: string, onAddedComment: () => void}> = (props) => {
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const { sendRequest, status, error } = useHttp<{message: string}, {comment: string}>(addComment);
  const commentTextRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const { onAddedComment } = props;

  useEffect(() => {
    if(status === 'completed' && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment])

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = commentTextRef.current.value;
    // send comment to server
    sendRequest({id: props.repairId, token, body:{comment: enteredText}});
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      { status === 'pending' && (
        <div className='centered'>
          <LoadingSpinner marginLeft='0'/>
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows={5} ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
