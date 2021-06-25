import { blogAPI } from "../api/api"
import { logout } from "./auth-reducer";

const CREATE_POST = 'CREATE_POST';
const GET_BLOG = 'GET_BLOG';
const DELETE_POST = 'DELETE_POST';
const UPDATE_POST = 'UPDATE_POST';
const GET_POST = 'GET_POST';
const RESET_BLOG = 'RESET_BLOG';

const initialState = {
    posts: [],
    post: {
        title: '',
        body: '',
        category: '',
        date: '',
        headerMedia: '',
        photo: [],
        video: []
    },
    currentPage: 1,
    totalPages: 0
}

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_POST: {
            return {
                ...state,
                posts: [action.post, ...state.posts]
            }
        }
        case GET_BLOG: {
            return {
                ...state,
                posts: [...state.posts, ...action.posts.posts],
                currentPage: action.posts.currentPage,
                totalPages: action.posts.totalPages
            }
        }
        case GET_POST: {
            return {
                ...state,
                post: action.post
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter((item) => item._id !== action.id)
            }
        }
        case UPDATE_POST: {
            return {
                ...state,
                posts: state.posts.map((item) => {
                    if (item._id === action.post._id) {
                        return action.post;
                    }
                    return item;
                })
            }
        }
        case RESET_BLOG: {
            return {
                ...state,
                posts: [],
                currentPage: 1,
                totalPages: 0
            }
        }
        default:
            return state;
    }

}

export const createPostAC = (post) => ({ type: CREATE_POST, post });
export const setBlogAC = (posts) => ({ type: GET_BLOG, posts });
export const deletePostAC = (id) => ({ type: DELETE_POST, id });
export const updatePostAC = (post) => ({ type: UPDATE_POST, post });
export const getPostAC = (post) => ({ type: GET_POST, post});
export const resetBlogAC = () => ({ type: RESET_BLOG});

export const getBlog = (currentPage, pageSize, category) => (dispatch) => {
    return new Promise((resolve, reject) => {
        resolve(blogAPI.getBlog(currentPage, pageSize, category)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setBlogAC(response.data));
                }
            })
    )})
}

export const getPost = (postId) => (dispatch) => {
    blogAPI.getPost(postId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getPostAC(response.data.post))
            }
        })
}

export const createPost = (post) => (dispatch) => {
    blogAPI.createPost(post)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(createPostAC(response.data.post));
            }
            if (response.data.resultCode === 1) {
                alert(response.data.error);
                dispatch(logout(sessionStorage.getItem('email'), response.data.error));
            }
        })
}
export const deletePost = (postId) => (dispatch) => {
    blogAPI.deletePost(postId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(deletePostAC(response.data._id));
            }
            if (response.data.resultCode === 1) {
                alert(response.data.error);
                dispatch(logout(sessionStorage.getItem('email'), response.data.error));
            }
        })
}

export const updatePost = (post) => (dispatch) => {
    blogAPI.updatePost(post)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(updatePostAC(response.data.post))
            }
            if (response.data.resultCode === 1) {
                alert(response.data.error);
                dispatch(logout(sessionStorage.getItem('email'), response.data.error));
            }
        })
}

export default blogReducer;