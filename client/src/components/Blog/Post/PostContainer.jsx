import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createPost, getPost, updatePost } from '../../../redux/blog-reducer';
import Post from './Post';
import PostEdit from './PostEdit';

const PostContainer = (props) => {

    useEffect(() => {
        const postId = props.match.params.postId;
        if (postId !== 'create') {
            props.getPost(postId);
        }
    }, [])

    if (props.isAuth) {
        if (props.match.params.postId !== 'create') {
            return <PostEdit post={props.post} updatePost={props.updatePost} />
        } else return <PostEdit createPost={props.createPost} />
    }

    return <Post post={props.post} />
}

let mapStateToProps = state => ({
    post: state.Blog.post,
    isAuth: state.Auth.isAuth
})

export default connect(mapStateToProps, { getPost, updatePost, createPost })(PostContainer);