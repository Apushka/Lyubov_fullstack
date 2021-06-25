import { aboutAPI } from "../api/api";
import { logout } from "./auth-reducer";

const SET_ABOUT_ME = 'SET_ABOUT_ME';
const UPDATE_ABOUT_ME = 'UPDATE_ABOUT_ME';

let initialState = {
    aboutInfo: {
        _id: '',
        aboutMe: ''
    }
}

const aboutmeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ABOUT_ME: {
            return {
                ...state,
                aboutInfo: action.aboutInfo
            }
        }
        case UPDATE_ABOUT_ME: {
            return {
                ...state,
                aboutInfo: action.aboutInfo
            }
        }
        default:
            return state;
    }
}

export const setAboutMeAC = (aboutInfo) => ({ type: SET_ABOUT_ME, aboutInfo });
export const updateAboutMeAC = (aboutInfo) => ({ type: UPDATE_ABOUT_ME, aboutInfo });

export const getAboutMe = () => {
    return (dispatch) => {
        aboutAPI.getAbout()
            .then(response => {
                if (response.data.resultCode === 0) {
                dispatch(setAboutMeAC(response.data.aboutInfo));
                }
            })
    }
}

export const updateAboutMe = (aboutMe) => {
    return (dispatch) => {
        aboutAPI.updateAbout(aboutMe)
            .then(response => {
                if (response.data.resultCode === 0) {
                dispatch(updateAboutMeAC(response.data.aboutInfo));
                }
                if (response.data.resultCode === 1) {
                    alert(response.data.message);
                    dispatch(logout(sessionStorage.getItem('email'), response.data.error));
                }
            })
    }
}


export default aboutmeReducer;