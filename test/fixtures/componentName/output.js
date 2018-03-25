'use strict';

React.createElement(
  ReactComponent,
  { className: classnames(classes.React__Component), 'data-qa-class': 'code_ReactComponent_React__Component'
  },
  React.createElement('div', {
    classname: classes.innerDiv,
    onClick: function onClick() {
      return doNothing();
    },
    style: { width: '20px' },
    'data-qa-class': 'code_div'
  })
);
