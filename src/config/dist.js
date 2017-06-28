'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',
  blogPostPath: 'http://alexsotocx.github.io/alexsotocx.co/blogposts/',
  blogPostsPath: 'http://alexsotocx.github.io/alexsotocx.co/blogposts/posts.json'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
