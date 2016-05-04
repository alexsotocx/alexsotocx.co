import { Router, Route, browserHistory, IndexRedirect, IndexRoute } from 'react-router';
import React from 'react';
import Main from './Template/Template';

import Blog from './Blog/Blog'
import BlogIndex from './Blog/BlogIndex'
import Post from './Blog/Post'

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Main}>
          <IndexRedirect to="blog"/>
          <Route path="blog" component={Blog}>
            <Route path=":post_name" component={Post}/>
            <IndexRoute component={BlogIndex}/>
          </Route>
        </Route>
      </Router>
    );
  }
}

export default App;
