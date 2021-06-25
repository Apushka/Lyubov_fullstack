import React from 'react';
import { useEffect } from "react";
import { connect } from "react-redux";
import { addPhoto, deletePhoto, getGallery, updatePhoto } from "../../redux/portfolio-reducer";
import { getSortedPortfolio } from '../../redux/selectors/selectors';
import Portfolio from "./Portfolio"
import PortfolioEdit from "./PortfolioEdit";


const PortfolioContainer = (props) => {
    useEffect(() => {
        props.getGallery();
    }, []);


    if (props.isAuth) return <PortfolioEdit gallery={props.gallery} error={props.error} addPhoto={props.addPhoto} deletePhoto={props.deletePhoto} updatePhoto={props.updatePhoto}/>

    return (
        <Portfolio gallery={props.gallery} />
    )
}
let mapStateToProps = (state) => ({
    error: state.Portfolio.error,
    // gallery: getSortedPortfolio(state),
    gallery: state.Portfolio.gallery,
    isAuth: state.Auth.isAuth
})

export default connect(mapStateToProps, { getGallery, addPhoto, deletePhoto, updatePhoto })(PortfolioContainer);