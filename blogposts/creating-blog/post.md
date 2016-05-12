# Creating a blog with React, React Router, Surge.sh, GitHubPages
I was wondering if I could create a blog by myself without using a prebuilt external services like [Jekyll](https://jekyllrb.com/), [Wordpress](https://en.wordpress.com/) because sometimes those services are unmanageable, has a lot of configurations and they are too complicated for me. So I come up with an idea, what if I can use [React](https://facebook.github.io/react/) to build a single page application to load and show the written posts?

## Architecture
As a software developer I tried to tear apart the data layer from the view layer, so I decided to have two static pages, one hosted in [Github pages](https://github.com) storing and serving the posts and another hosted using [Surge.sh](https://surge.sh) to load the web application.

![Architecture image, github and surge connection](http://posts.alexsotocx.co/blogposts/creating-blog/architecture.png)

### Github pages - Data
Github pages allows you to create a static page, but currently we are using it to keep our blogpost in a configured structure. A github page is stored in a branch commonly named **gh-pages** (Take a look at mine https://github.com/alexsotocx/alexsotocx.co/tree/gh-pages). I chose github to store the post because I can edit them online with a preview and see the how our post are stored.

The entry point of this page is a [JSON file](https://raw.githubusercontent.com/alexsotocx/alexsotocx.co/gh-pages/blogposts/posts.json) that specifies which post are available to show and some basic information. Let's take a look at the json file:

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

The posts are going to be store in a selected folder, each post must have a folder with a unique name (like a normal file system). In the post folder will be the files needed to correctly render the post; as we use markdown to generate our posts we define a file called **post.md**.

### Surge - Webpage
Surge is a static page publisher, it let you upload a static page to their servers and they serve all your files using a CDN. I choose surge because it let you publish your website from your terminal and let you manage client side routing using HTML5 API, take a look at this [article](https://surge.sh/help/adding-a-200-page-for-client-side-routing).

In Surge I hosted a Webapp made with **React** for adding the complete dynamic app rendered from the client, **React router** to use the HTML5 API to route from client, **Markdown-it** to transform the markdown post to HTML, **Redux** to handle the dataflow and **Superagent** to make the request.


To publish a website to **surge** follow this tutorial https://surge.sh/help/getting-started-with-surge, it explains how to publish and it is really easy!

## How does the blog work?
As mentioned, when a user comes to the page hosted in surge, when it loads the client request the file **posts.json** in the github page, then It render the index, now when a user click the post that he or she want to read, the client request the **post.md** from github and after transforming it to HTML show it to the user.

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
React router provides us a way to specify the routes for our application, that is done creating a **Route** component. The route component has two basic props, the **path** and the **component** that will handle that route. We have to define three routes to make our blog work, let's see them:

1. The root **"/"**: Where the users will arrive.
2. The blog index **"/blog"**: Where all the posts are shown.
3. The post view **"/blog/:post_name"**: Where the selected post is shown.



The code to represent the router is:

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
The index is where our users will arrive. This page will help the user to find what they want to read.

When the user come to this route, React Router will mount the **BlogIndex** component and it fire an action called **componentWillMount**, this action is a function, it will request from **GithubPages** the file posts.json.
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
**Note**: In the last code I used a variable config, this variable has the configuration(urls, variables) depending of the environment that we are running.

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
The most important part of the last code is the connection  between pages, it's done using the the **Link** component that connects to the postviewer.
```javascript
<Link to={`/blog/${post.folder}`} className="full-container-link"></Link>
```

### Building the post viewer
The post viewer is one of the easiest component, but it's the most important. This component load the post from **GithubPages** in markdown format and transform it to HTML using **Markdown-it** module and then insert it to the view. 
This component handles the route <Route path="blog/:post_name" component={Post}/>, as the user comes to this page, React router generates a **param** variable that has post_name it. We use the post_name variable to request the specific post.

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
Take a look at the complete code at my repository: https://github.com/alexsotocx/alexsotocx.co

### Publishing our work
When finished we need to:

1. Create the content and publish it to **github**.
2. Create a new entry in our **posts.json** file.
3. Publish our static web app to **surge.sh** using the command line.
4. Take a look at it at your page - http://alexsotocx.co.

## Future work
1. Create SEO Tags.
2. Pagination.
3. Implement a search.
4. Migrate to redux.
5. Social networking
6. Post comments

# Conclusion
We code a blog with our own hands, well that's good, but there is a lot things you can do with static pages, create your ideas and make them real with **React**... If you need more potential create server with Heroku(Free!) create a full web app!

# About me
* **Name**: Alexander Soto
* **Email**: asoto@innventto.com
* **twitter**: [alexsotocx](https://www.twitter.com/alexsotocx)
* **Linkedin**: [Alvaro Alexander Soto Cardona](https://www.linkedin.com/in/alvaro-alexander-soto-cardona-374849108)
* **Company**: [Innventto S.A.S](http://www.innventto.com)
