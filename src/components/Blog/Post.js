import React from 'react';
import request from 'superagent';
import markdown from 'utilities/markdownWrapper'
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
      .get(`/blogposts/${this.props.postName}`)
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
    console.log('Hey ---', this.state.post)
    if(this.state.loading) {
      return null;
    } else {
      return (
        <div dangerouslySetInnerHTML={{__html: markdown(this.state.post)}}></div>
      );
    }

  }
}

Post.propTypes = { postName: React.PropTypes.string.isRequired };

export default Post;
