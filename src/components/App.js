import { Router, Route, hashHistory, IndexRedirect, IndexRoute } from 'react-router';
import React from 'react';
import Main from './Template/Template';

import BlogIndex from './Blog/BlogIndex'
import Post from './Blog/Post'

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <IndexRedirect to="blog"/>
          <Route path="blog" component={BlogIndex}/>
          <Route path="blog/:post_name" component={Post}/>
        </Route>
      </Router>
    );
  }
}

export default App;
