import React from 'react';
import request from 'superagent';
import markdown from 'utilities/markdownWrapper';
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
      .get(`/blogposts/${this.props.params.post_name}/post.md`)
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
      return null;
    } else {
      return (
        <article className="PostContent" dangerouslySetInnerHTML={{__html: markdown(this.state.post)}}></article>
      );
    }
  }
}


export default Post;
