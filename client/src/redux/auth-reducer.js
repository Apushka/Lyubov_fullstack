import { authAPI } from "../api/api";

const SET_AUTH = 'SET_AUTH';
const LOGOUT = 'LOGOUT';

const initialState = {
    email: sessionStorage.getItem('email'),
    isAuth: !!sessionStorage.getItem('token'),
    error: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH: {
            return {
                ...state,
                email: action.data.email,
                isAuth: !!action.data.token,
                error: action.data.error
            }
        }
        case LOGOUT: {
            return {
                ...state,
                email: action.email,
                isAuth: action.isAuth,
                error: action.error
            }
        }
        default:
             return state;
    }
}

export const loginAC = (data) => ({ type: SET_AUTH, data });
export const logoutAC = (email, isAuth, error) => ({ type: LOGOUT, email, isAuth, error })

export const login = (formData) => {
    return (dispatch) => {
        authAPI.login(formData)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(loginAC(response.data));
                    sessionStorage.setItem('token', response.data.token);
                    sessionStorage.setItem('email', response.data.email)
                }
            }, error => {
                dispatch(loginAC(error.response.data))
            })
    }
}

export const logout = (email, error) => {
    return (dispatch) => {
        authAPI.logout(email)
            .then(response => {
                if (response.data.resultCode === 0) {
                    sessionStorage.removeItem('token')
                    sessionStorage.removeItem('email')
                    dispatch(logoutAC('', false, error))
                }
            })
    }
}

export default authReducer;