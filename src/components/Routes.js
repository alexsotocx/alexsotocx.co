import { Router, Route, browserHistory } from 'react-router';
import React from 'react';
import Main from './Main.js';

class Routes extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Main}>
        </Route>
      </Router>
    );
  }
}

export default Routes;
