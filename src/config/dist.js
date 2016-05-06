'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',
  blogPostPath: 'http://blogposts.alexsotocx.co/blogposts/',
  blogPostsPath: 'http:// blogposts.alexsotocx.co/blogposts/posts.json'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
