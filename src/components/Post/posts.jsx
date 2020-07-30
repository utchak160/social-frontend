import React, {useEffect, Fragment} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getAllPosts} from "../../store/actions/post.action";
import Spinner from "../Shared/Spinner/spinner";
import PostItem from "./postItem";

const Posts = ({getAllPosts, post: {posts, loading}}) => {
    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    return (
        <Fragment>
            {loading ? <Spinner/> : (
                <Fragment>
                    <section className="container">
                        <h1 className="large text-primary">
                            Posts
                        </h1>
                        <p className="lead"><i className="fas fa-user" /> Welcome to the community!</p>

          {/*              <div className="post-form">*/}
          {/*                  <div className="bg-primary p">*/}
          {/*                      <h3>Say Something...</h3>*/}
          {/*                  </div>*/}
          {/*                  <form className="form my-1">*/}
          {/*<textarea*/}
          {/*    name="text"*/}
          {/*    cols="30"*/}
          {/*    rows="5"*/}
          {/*    placeholder="Create a post"*/}
          {/*    required*/}
          {/*></textarea>*/}
          {/*                      <input type="submit" className="btn btn-dark my-1" value="Submit"/>*/}
          {/*                  </form>*/}
          {/*              </div>*/}

                        <div className="posts">
                            {posts.map(post => (
                                <PostItem key={post._id} post={post} />
                            ))}
                        </div>
                    </section>
                </Fragment>)}
        </Fragment>
    )
}

Posts.propTypes = {
    getAllPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, {getAllPosts})(Posts);
