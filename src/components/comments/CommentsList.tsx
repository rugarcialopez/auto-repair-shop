import CommentItem from './CommentItem';
import classes from './CommentsList.module.css';

const CommentsList: React.FC<{comments: string[]}> = (props) => {
  return (
    <ul className={classes.comments}>
      {props.comments.map((comment, index) => (
        <CommentItem key={index} text={comment} />
      ))}
    </ul>
  );
};

export default CommentsList;
