require('normalize.css/normalize.css');
require('styles/App.styl');

import React from 'react';

import Navbar from './Navbar';
import InformationAside from './InformationAside';
import Footer from './Footer';

class Template extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <section className="content">
          <article className="content">
            {this.props.children}
          </article>
          <InformationAside/>
        </section>
        <Footer/>
      </div>
    );
  }
}

export default Template;
