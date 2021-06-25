import React from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../../redux/contacts-reducer';
import Contacts from './Contacts';

const ContactsContainer = (props) => {
    
    return (
        <Contacts {...props} sendMessage={props.sendMessage}/>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.Auth.isAuth,
    contacts: state.Contacts.contacts
})

export default connect(mapStateToProps, { sendMessage })(ContactsContainer);