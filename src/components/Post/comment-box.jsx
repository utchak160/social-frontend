import React, {useState} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addComment} from "../../store/actions/post.action";

const CommentBox = ({addComment, postId}) => {
    const [text, setText] = useState('');

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave A Comment</h3>
            </div>
            <form className="form my-1" onSubmit={event => {
                event.preventDefault();
                addComment(postId, {text});
                setText('');
            }}>
          <textarea
              name="text"
              cols="30"
              rows="5"
              value={text}
              onChange={(event => setText(event.target.value))}
              placeholder="Comment on this post"
              required
          />
                <input type="submit" className="btn btn-dark my-1" value="Submit"/>
            </form>
        </div>
    )
}

CommentBox.propTypes = {
    addComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
}

export default connect(null, {addComment})(CommentBox);
