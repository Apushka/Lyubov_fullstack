import React from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router';
import AboutMeContainer from './components/AboutMe/AboutMeContainer';
import PortfolioContainer from './components/Portfolio/PortfolioContainer';
import BlogContainer from './components/Blog/BlogContainer';
import ContactsContainer from './components/Contacts/ContactsContainer';
import FooterContainer from './components/Footer/FooterContainer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import ScrollRestoration from './components/ScrollRestoration/ScrollRestoration';
import PostContainer from './components/Blog/Post/PostContainer';


function App() {

  return (
    <div className='app_wrapper'>
      <Header />
      <div className='app_wrapper_content'>
        <ScrollRestoration />
        <Switch>
          <Redirect exact from='/' to='/main' />
          <Route path='/about' render={() => <AboutMeContainer />} />
          <Route path='/portfolio' render={() => <PortfolioContainer />} />
          <Route exact path='/blog/:category?' render={(props) => <BlogContainer {...props} />} />
          {/* <Route path='/blog/makeupbag' component={BlogContainer} /> */}
          <Route path='/blog/post/:postId?' render={(props) => <PostContainer {...props} />} />
          <Route path='/contacts' render={() => <ContactsContainer />} />
          <Route path='/main' render={() => <Main />} />
        </Switch>
      </div>
      <FooterContainer />
    </div>
  );
}
export default App;
