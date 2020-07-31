import React, {useEffect, Fragment} from "react";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from "../Shared/Spinner/spinner";
import {getPost} from "../../store/actions/post.action";
import PostItem from "../Posts/postItem";

const Post = ({post: {post, loading}, auth, match, getPost}) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match])

    return (
        loading && post === null ? <Spinner /> : (
            <Fragment>
                <section className="container">
                    <Link to="/posts" className="btn">Back To Posts</Link>
                    <PostItem post={post} showActions={false} />



                    <div className="comments">
                        <div className="post bg-white p-1 my-1">
                            <div>
                                <a href="profile.html">
                                    <img
                                        className="round-img"
                                        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                        alt=""
                                    />
                                    <h4>John Doe</h4>
                                </a>
                            </div>
                            <div>
                                <p className="my-1">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                                    possimus corporis sunt necessitatibus! Minus nesciunt soluta
                                    suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
                                    dolor? Illo perferendis eveniet cum cupiditate aliquam?
                                </p>
                                <p className="post-date">
                                    Posted on 04/16/2019
                                </p>
                            </div>
                        </div>

                        <div className="post bg-white p-1 my-1">
                            <div>
                                <a href="profile.html">
                                    <img
                                        className="round-img"
                                        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                        alt=""
                                    />
                                    <h4>John Doe</h4>
                                </a>
                            </div>
                            <div>
                                <p className="my-1">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                                    possimus corporis sunt necessitatibus! Minus nesciunt soluta
                                    suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
                                    dolor? Illo perferendis eveniet cum cupiditate aliquam?
                                </p>
                                <p className="post-date">
                                    Posted on 04/16/2019
                                </p>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
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
