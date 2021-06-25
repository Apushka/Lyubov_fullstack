import { portfolioAPI } from "../api/api";
import { logout } from "./auth-reducer";

const SET_GALLERY = 'SET_GALLERY';
const ADD_PHOTO = 'ADD_PHOTO';
const ERROR = 'ERROR';
const DELETE_PHOTO = 'DELETE_PHOTO';
const UPDATE_PHOTO = 'UPDATE_PHOTO';

let initialState = {
    gallery: [],
    error: false
}

const portfolioReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GALLERY: {
            return {
                ...state,
                gallery: action.data
            }
        }
        case ADD_PHOTO: {
            return {
                ...state,
                gallery: [...state.gallery, action.photo ]
            }
        }
        case ERROR: {
            return {
                ...state,
                error: action.error
            }
        }
        case DELETE_PHOTO: {
            return {
                ...state,
                gallery: state.gallery.filter((item, index) => index !== +action.photoId)
            }
        }
        case UPDATE_PHOTO: {
            return {
                ...state,
                gallery: state.gallery.map((item, index) => {
                    if (index === +action.photoId) {
                        return action.photo
                    }
                    return item;
                })
            }
        }
        default:
            return state;
    }
}

export const setGallery = (data) => ({ type: SET_GALLERY, data });
export const addPhotoAC = (photo) => ({ type: ADD_PHOTO, photo });
export const errorAC = (error) => ({ type: ERROR, error });
export const deletePhotoAC = (photoId) => ({ type: DELETE_PHOTO, photoId });
export const updatePhotoAC = (photoId, photo) => ({ type: UPDATE_PHOTO, photoId, photo });

export const getGallery = () => async (dispatch) => {
    const data = await portfolioAPI.getPorfolio();
    dispatch(setGallery(data));
}

export const addPhoto = (photo) => async (dispatch) => {
    portfolioAPI.addPhoto(photo)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(errorAC(false));
                dispatch(addPhotoAC(response.data.photo));
            }
            if (response.data.resultCode === 1) {
                alert(response.data.error);
                dispatch(logout(sessionStorage.getItem('email'), response.data.error));
            }
        })
        .catch(err => dispatch(errorAC(true)));
}

export const deletePhoto = (photoId) => (dispatch) => {
    portfolioAPI.deletePhoto(photoId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(deletePhotoAC(response.data.id));
            }
            if (response.data.resultCode === 1) {
                alert(response.data.error);
                dispatch(logout(sessionStorage.getItem('email'), response.data.error));
            }
        })
}

export const updatePhoto = (photoId, photo) => (dispatch) => {
    portfolioAPI.updatePhoto(photoId, photo)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(updatePhotoAC(response.data.id, response.data.photo))
            }
            if (response.data.resultCode === 1) {
                alert(response.data.error);
                dispatch(logout(sessionStorage.getItem('email'), response.data.error));
            }
        })
}


export default portfolioReducer;