import React from 'react';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="NavigationBar">
        <ul>
          <li>Home</li>
          <li>Blog</li>
          <li>Catalogue</li>
          <li>About</li>
        </ul>
      </nav>
    );
  }
}
export default Navbar;
