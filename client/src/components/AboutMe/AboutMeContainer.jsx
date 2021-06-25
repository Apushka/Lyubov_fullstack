import AboutMe from "./AboutMe";
import AboutMeEdit from "./AboutMeEdit";
import { connect } from 'react-redux';
import { getAboutMe, updateAboutMe } from "../../redux/aboutme-reducer";
import { useEffect } from "react";

const AboutMeContainer = (props) => {
    useEffect(() => {
        props.getAboutMe()
    }, []);

    if (props.isAuth) {
        return <AboutMeEdit {...props} />
    }
    return (
            <AboutMe {...props} />
    )
}

let mapStateToProps = (state) => ({
    aboutInfo: state.AboutMe.aboutInfo,
    isAuth: state.Auth.isAuth
});
export default connect(mapStateToProps, { getAboutMe, updateAboutMe })(AboutMeContainer);