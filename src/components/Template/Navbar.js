import React from 'react';
import {Link} from 'react-router';
class Navbar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="NavigationBar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/catalog">Catalog</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
    );
  }
}
export default Navbar;
