import React from 'react';
import {Link} from 'react-router';
let config = require('config').default;

export default class PostSummary extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let post = this.props.post;
    return (
      <article className="post">
        <Link to={`/blog/${post.folder}`} className="full-container-link"></Link>
        <img className="image" src={`${config.blogPostPath}/${post.folder}/${post.cover_image}`}/>
        <section className="details">
          <p className="title">{post.title}</p>
          <p className="description">{post.description}</p>
          <section className="tags">
            {post.tags.map((tag, index) => <span className="tag" key={index}>{tag}</span>)}
          </section>
          <section className="author">
            <p className="name">{post.author.name}</p>
            <p className="name">{post.author.email}</p>
          </section>
          <p className="date">{post.date}</p>
        </section>
      </article>
    );
  }
}
