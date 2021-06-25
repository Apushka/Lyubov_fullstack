import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import aboutmeReducer from './aboutme-reducer';
import portfolioReducer from './portfolio-reducer';
import blogReducer from './blog-reducer';
import contactsReducer from './contacts-reducer';
import authReducer from './auth-reducer';


let reducers = combineReducers({
    AboutMe: aboutmeReducer,
    Portfolio: portfolioReducer,
    Blog: blogReducer,
    Contacts: contactsReducer,
    Auth: authReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;

