# React Tutorial with webpack
This is the React comment box example from [the React tutorial](http://facebook.github.io/react/docs/tutorial.html) converted to use [webpack](https://webpack.github.io/), import/export statements, and class definition syntax all transpiled by [Babel](http://babeljs.io/).

## Purpose
My intention was to keep this simple and static so no additional backend server is needed. This was also a primer for me getting up to speed with React using patterns my co-workers have established. There are no calls to fetch or persist data into a datastore. Data is provided by Google Books open GET api using [reqwest](https://github.com/ded/reqwest) which is a bit divergent from the original tutorial. I also removed the use of Markdown and `dangerouslySetInnerHTML` which it incurs. I'm not sure why the folks at Facebook decided to include it as part of their flagship tutorial.

***

## To use
1. `git clone git@github.com:philmill/reactutn.git`
2. `cd reactutn`
3. `npm i`
4. `npm start`

This starts an instance of [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html) and can be viewed by visiting either `localhost:8080` to see committed build or if you want to modify sources with hot module reloading visit `localhost:8080/webpack-dev-server/`

*Note:* the dev server doesn't overwrite build assets, instead HMR are are served from memory.
