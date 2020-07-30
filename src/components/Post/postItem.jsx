import React from "react";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import Moment from "react-moment";
import PropTypes from 'prop-types';
import {addLike, removeLike} from "../../store/actions/post.action";

const PostItem = ({post: {avatar, date, _id, name, user, likes, comments, text}, auth, addLike, removeLike}) => (
    <div className="post bg-white p-1 my-1">
        <div>
            <Link to={`/profile/${user}`}>
                <img
                    className="round-img"
                    src={avatar}
                    alt="avatar"
                />
                <h4>{name}</h4>
            </Link>
        </div>
        <div>
            <p className="my-1">
                {text}
            </p>
            <p className="post-date">
                Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
            </p>
            <button onClick={(e) => addLike(_id)} type="button" className="btn btn-light">
                <i className="fas fa-thumbs-up" />
                {likes && likes.length > 0 && (<span>{likes.length}</span>)}
            </button>
            <button onClick={(e) => removeLike(_id)} type="button" className="btn btn-light">
                <i className="fas fa-thumbs-down" />
            </button>
            <Link to={`/post/${_id}`} className="btn btn-primary">
                Discussion
                {comments && comments.length > 0 && (<span className='comment-count'>{comments.length}</span>)}
            </Link>
            {auth.isAuthenticated && user === auth.user._id && (
                <button
                    type="button"
                    className="btn btn-danger"
                >
                    <i className="fas fa-times" />
                </button>
            )}
        </div>
    </div>
)

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {addLike, removeLike})(PostItem);
