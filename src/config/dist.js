'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',
  blogPostPath: 'http://posts.alexsotocx.co/blogposts/',
  blogPostsPath: 'http://posts.alexsotocx.co/blogposts/posts.json'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
