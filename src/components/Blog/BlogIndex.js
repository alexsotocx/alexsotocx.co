import React from 'react';
import Post from './Post';
export default class BlogIndex extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Post postName="ruby-start-guide.md"/>
      </div>
    );
  }
}
