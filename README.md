##Blog(Node.js)

This is the new blog, extends for N-blog, but used modules for new version.


This is the N-blog's repo:
https://github.com/nswbmw/N-blog

debug and run:
DEBUG=express:* node ./bin/www

use supervisor:
DEBUG=express:* supervisor bin/www

about supervisor:
if you change your files, then supervisor restart node.js server.

install supervisor:
npm install -g supervisor