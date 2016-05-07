require('normalize.css/normalize.css');
require('styles/App.styl');

import React from 'react';

import Navbar from './Navbar';
import Footer from './Footer';

class Template extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <section className="header"/>
        <section className="page">
          <section className="content">
            {this.props.children}
          </section>
        </section>
        <Footer/>
      </div>
    );
  }
}

export default Template;
