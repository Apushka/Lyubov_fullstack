import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { login, logout } from '../../redux/auth-reducer';
import Footer from './Footer';

const FooterContainer = (props) => {

    useEffect(() => {

    }, [props.email, props.isAuth])

    return (
        <Footer isAuth={props.isAuth} email={props.email} logout={props.logout} login={props.login}/>
    )
}

let mapStateToProps = state => ({
    email: state.Auth.email,
    isAuth: state.Auth.isAuth
})

export default connect(mapStateToProps, { logout, login })(FooterContainer);