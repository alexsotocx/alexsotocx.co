# Creating a blog with React, React Router, Surge.sh, GitHubPages
I was wondering if I could create a blog by myself without using a prebuilt external service like [Jekyll](https://jekyllrb.com/), because sometimes those libraries are unmanageable. So I come up with an idea, what if I can use [React](https://facebook.github.io/react/) to build a single page application to load and show the written posts?

## Architecture
As a software developer I tried to tear apart the data layer from the view layer, so I decided to have two static pages, one hosted in [Github](https://github.com) and the other is hosted using [Surge.sh](https://surge.sh).

![Architecture image, github and surge connection](http://posts.alexsotocx.co/blogposts/creating-blog/architecture.png)

### Github pages
Here all the posts are stored and served with a specific folder structure. A github page is stored in a branch commonly named **gh-pages** in your repository (Take a look at mine https://github.com/alexsotocx/alexsotocx.co/tree/gh-pages). I choose github to store the post because I can edit them online with a preview and simply manage them.

That branch must have a entry __json__ [file](https://raw.githubusercontent.com/alexsotocx/alexsotocx.co/gh-pages/blogposts/posts.json) where all the entries will be saved and then used to show the information on the page. Let's take a look at the json file:

```json
{
  "posts": [
    {
      "title": "Ruby starting guide",
      "folder": "ruby-guide",
      "cover_image": "ruby.png",
      "author": {
        "name": "Alexander Soto Cardona",
        "email": "asoto@innventto.com"
      },
      "tags": ["ruby", "syntax", "guide"],
      "description": "Ruby starting syntax, basic commands to make your ruby programs run",
      "date": "2016-04-01"
    }
  ]
}

```
The **posts** key is an array with the posts of the blog, each post must have:

1. **title**: Is the name of the post.
2. **folder**: The folder where the post files are stored.
3. **cover_image**: The image of the post.
4. **author**: Is a json object storing all the information about the author
5. **tags**: Is a json array where the tags of the posts.
6. **description**: Is the description of the post.
7. **data**: The published date.

### Surge
Surge is a static page publisher, it let you upload a static page to their servers and they serve all your files using a CDN. I choose surge because it let you publish it all from your terminal and let you manage client side routing using HTML5 API, take a look at this [article](https://surge.sh/help/adding-a-200-page-for-client-side-routing).

Here I hosted a Webapp made with **React** for adding the complete dinamic app rendered from the client, **React router** to use the HTML5 API to route from client, **Markdown-it** to transform the markdown post to HTML, **Redux** to handle the dataflow and **Superagent** to make the request.

## Implementation
Let's start coding. First of all, make sure you have a version of **nodejs** superior to 4.x.x, you can install it using [NVM](https://github.com/creationix/nvm).

### Scaffolding our Application
After install nodejs, let's use [Yeoman](http://yeoman.io/) to scaffolding our web application.

```
npm install -g yo
```

With yeoman we can install the generator needed to structure our app. I personally used the [Generator React Webpack](https://github.com/newtriks/generator-react-webpack) because it has a lot of features and you can configure it easily. So, to install this generator and scaffold our app. Run the next commands in your terminal and follow the instructions.

```
npm install -g generator-react-webpack
mkdir blog && cd blog
yo react-webpack
```

### Installing needed dependencies
To correctly make our project work we need to do four basic things first.

1. Install all the dependencies from the scaffolded project with ```npm install```
2. **React Router**: ```npm install --save react-router```
3. **Markdown it**: ```npm install --save markdown-it```
4. **Superagent**: ```npm install --save superagent```


### Build the router
With React Router we need to create a component with the routes. There three routes that we need:

1. The root **"/"**: Where the users will arrive.
2. The blog index **"/blog"**: Where all the posts are shown.
3. The post view **"/blog/:post_name"**: Where the selected post is shown.

With React Router we specify with a Route component the path and the component that will handle that route; The nested routes that we use in the code are the templates.

The code to represent it is:

```javascript
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import React from 'react';
import Main from './Template/Template';

import BlogIndex from './Blog/BlogIndex'
import Post from './Blog/Post'

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={browserHistory}>{//The browser history is the HTML5 API to client routing}
        <Route path="/" component={Main}>
          <IndexRedirect to="blog"/>
          <Route path="blog" component={BlogIndex}/>
          <Route path="blog/:post_name" component={Post}/>
        </Route>
      </Router>
    );
  }
}

export default App;

```
### Building the index
The index is where our users will arrive, that's an important part of our code. This section will help the user to find what they want to read.

When the user come to this route, React Router will mount the **BlogIndex** component and it fire an action called **componentWillMount**, this action is a function that in this case will request from **GithubPages** the file posts.json.
The **posts.json** file contains the information of the post. With this information we can create a complete index and make links between the blog index and the actual post.

**Note**: This a representative code, it works but the code isn't made in the best way. To make it properly we should use [Redux](https://github.com/reactjs/redux).

```javascript
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
```
As you can see there's another component called **PostSummary**, it's just a representation of the summary of the post that comes from the json file.

```javascript
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

```
The most important part of the last code is the connection  between pages.
```javascript
<Link to={`/blog/${post.folder}`} className="full-container-link"></Link>
```

### Building the post viewer
The post viewer is one of the easies component, but it's the most important. This component load the post from **GithubPages** in markdown format and transform it to HTML using **Markdown-it** module and insert it to the view. 

Let's see:

```javascript
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

```
### Complete code
Take a look at the complete at my repository: https://github.com/alexsotocx/alexsotocx.co

### Publishing our work
When finished we need to:

1. Create the content and publish it to **github**.
2. Create a new entry in our **posts.json** file.
3. Publish our static web app to **surge.sh** using the command line.
4. Take a look at it.

## Future work
1. Create SEO Tags.
2. Pagination.
3. Implement a search.
4. Migrate to redux.
5. Social networking
6. Post comments


# About me
* **Name**: Alexander Soto
* **Email**: asoto@innventto.com
* **twitter**: [alexsotocx](www.twitter.com/alexsotocx)
* **Linkedin**: [Alvaro Alexander Soto Cardona](https://www.linkedin.com/in/alvaro-alexander-soto-cardona-374849108)
* **Company**: [Innventto S.A.S](www.inventto.com)
