import React from 'react';
import {Link} from 'react-router';
let react_logo = require('images/footer/react-logo.png');
let github_logo = require('images/footer/github-logo.png');
let surge_logo = require('images/footer/surge-logo.png');
let yeoman_logo = require('images/footer/yeoman-logo.png');
let webpack_logo = require('images/footer/webpack-logo.png');
let react_router_logo = require('images/footer/react-router-logo.png');

class Footer extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="Footer">
        <ul>
          <li>
            <a href="https://github.com/reactjs/react-router">
              <img src={react_router_logo}/>
            </a>
          </li>
          <li>
            <a href="https://webpack.github.io/">
              <img src={webpack_logo}/>
            </a>
          </li>
          <li>
            <a href="https://facebook.github.io/react/">
              <img src={react_logo}/>
            </a>
          </li>
          <li className="logo">
            <Link to="/">
              <h4>alexsotocx.co</h4>
            </Link>
          </li>
          <li>
            <a href="https://surge.sh/">
              <img src={surge_logo}/>
            </a>
          </li>
          <li>
            <a href="https://github.com/">
              <img src={github_logo}/>
            </a>
          </li>
          <li>
            <a href="http://yeoman.io/">
              <img src={yeoman_logo}/>
            </a>
          </li>
        </ul>
      </footer>
    );
  }
}
export default Footer;
