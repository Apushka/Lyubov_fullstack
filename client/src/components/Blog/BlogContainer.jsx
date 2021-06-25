import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createPost, deletePost, getBlog, resetBlogAC } from '../../redux/blog-reducer';
import BlogEdit from './BlogEdit';
import Blog from './Blog';

const BlogContainer = (props) => {
    const [fetching, setFetching] = useState(true);
    const [currentPage, setCurrentPage] = useState(props.currentPage);
    const [category, setCategory] = useState(props.match.params.category);

    useEffect(() => {
        if (category !== props.match.params.category) {
            props.resetBlogAC();
            setCategory(props.match.params.category);
            setCurrentPage(1);
            setFetching(true);
        }

        if (fetching && (props.totalPages !== props.currentPage)) {
            Promise.resolve(props.getBlog(currentPage, 3, category))
                .then(() => {
                    setCurrentPage(prevState => prevState + 1);
                })
                .finally(() => setFetching(false))

        }
    }, [fetching, props.match.params.category, category])

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, [])

    const handleScroll = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetching(true);
        }
    }

    if (props.isAuth) {
        return <BlogEdit posts={props.posts} post={props.post} createPost={props.createPost} deletePost={props.deletePost} />
    }

    return (
        <Blog posts={props.posts} totalPosts={props.totalPosts} />
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.Auth.isAuth,
    posts: state.Blog.posts,
    currentPage: state.Blog.currentPage,
    totalPages: state.Blog.totalPages,
    post: state.Blog.post
})

export default connect(mapStateToProps, { getBlog, createPost, deletePost, resetBlogAC })(BlogContainer);