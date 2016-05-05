import React from 'react';
import PostSummary from './PostSummary';
import request from 'superagent';

let config = require('config').default;

class BlogIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true
    }
  }

  componentWillMount() {
    request
      .get(config.blogPostsPath)
      .set('Accept', 'application/json')
      .end((err, res) => {
        let loading = false, posts = [];
        if(!err) {
          posts = res.body.posts;
        }
        this.setState({
          loading: loading,
          posts: posts
        });
      })

  }


  render() {
    if(this.state.loading) {
      return null;
    } else {
      return (
        <div>
          {this.state.posts.map((post, index) => <PostSummary post={post} key={index}/>)}
        </div>
      );
    }

  }
}

export default BlogIndex
