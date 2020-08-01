import React, {useEffect, Fragment} from "react";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from "../Shared/Spinner/spinner";
import {getPost} from "../../store/actions/post.action";
import PostItem from "../Posts/postItem";
import CommentBox from "./comment-box";
import Comment from "./Comment";

const Post = ({post: {post, loading}, auth, match, getPost}) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match])

    return (
        loading || post === null ? <Spinner /> : (
            <Fragment>
                <section className="container">
                    <Link to="/posts" className="btn">Back To Posts</Link>
                    <PostItem post={post} showActions={false} />
                    <CommentBox postId={post._id} />

                    <div className="comments">
                        {post.comments.map(comment => (
                            <Comment key={comment._id} comment={comment} postId={post._id} />
                        ))}
                    </div>
                </section>
            </Fragment>
        )
    )
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post
})

export default connect(mapStateToProps, {getPost})(Post);
