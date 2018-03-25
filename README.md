[![npm version](https://img.shields.io/npm/v/babel-plugin-reactjss-class-info.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-reactjss-class-info)



# babel-reactjss-class-info

This is specific solution to a problem for integrating Selenium tests with reactjss. I do not plan adding features for other developers for the time being, but feel free to use this if it benefits you.

## Install

```sh
npm install --save-dev babel-plugin-reactjss-class-info
```

## Usage

*.babelrc*

```js
{
  plugins: ["reactjss-class-info"]
}
```

## Examples

#### Input

`myfile.js`
```js
import React from 'react';
import classnames from 'classnames';

class ReactComponent extends React.Component {
  render() {
    const { classes } = this.props;

    return(
      <ReactComponent className={classes.main}>
        <header
          onClick={this.handleClick}
          className={classnames({
            [classes.header]: true,
            [classes.hovered]: false
          })}
        />
        <div
          id="component-body"
          className={classnames(
            [classes.one, classes.two],
            classes.three,
            { [classes.four]: true }
          )}
        >
          I am the body
        </div>
      </ReactComponent>
    )
  }
}
```

#### Output

`myfile.js`
```js
import React from 'react';
import classnames from 'classnames';

class ReactComponent extends React.Component {
  render() {
    const { classes } = this.props;

    return(
      <ReactComponent
        className={classes.main}
        data-qa-class="myfile_ReactComponent_main"
      >
        <header
          onClick={this.handleClick}
          className={classnames({
            [classes.header]: true,
            [classes.hovered]: false
          })}
          data-qa-class="myfile_header_header-hovered"
        />
        <div
          id="component-body"
          className={classnames(
            [classes.one, classes.two],
            classes.three,
            { [classes.four]: true }
          )}
          data-qa-class="myfile_div_one-two-three-four"
        >
          I am the body
        </div>
      </ReactComponent>
    )
  }
}
```

Currently, the plugin will output the class in the following format:

`[filename]_[component name]_[all classes delimited by -]`
