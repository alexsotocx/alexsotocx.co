import React from 'react';
import request from 'superagent';
import {Link} from 'react-router';
import markdown from 'utilities/markdownWrapper';


let config = require('config').default;

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      post: null
    }
  }

  componentDidMount() {
    request
      .get(`${config.blogPostPath}${this.props.params.post_name}/post.md`)
      .end((err, res) => {
        var post = '# Error\n';
        if(!err) {
          post = res.text;
        }
        this.setState({
          loading: false,
          post: post
        });
      })
  }

  render() {
    if(this.state.loading) {
      return <Link to="/blog">Go back</Link>;
    } else {
      return (
        <div className="Entry">
          <Link to="/blog" className="static-link"><i className="fa fa-arrow-left"/> Go back</Link>
          <article className="PostContent" dangerouslySetInnerHTML={{__html: markdown(this.state.post)}}></article>
        </div>
      );
    }
  }
}


export default Post;
