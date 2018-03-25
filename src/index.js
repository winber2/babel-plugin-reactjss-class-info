export default function ({ types: t }) {
  let dataPrefix = 'data-qa';
  let classPrefix = 'className';
  let jssClassPrefix = 'classes';
  let disableClass = false;

  let fileNameAttr;
  let nodeNameAttr;

  const visitor = {
    Program(path, state) {
      if (state.opts.dataPrefix) {
        dataPrefix = state.opts.prefix;
      }

      if (state.opts.classPrefix) {
        classPrefix = state.opts.classPrefix;
      }

      if (state.opts.jssClassPrefix) {
        jssClassPrefix = state.opts.jssClassPrefix;
      }

      if (state.opts.disableClass === true) {
        disableClass = true;
      }

      fileNameAttr = `${dataPrefix}-file`;
      nodeNameAttr = `${dataPrefix}-class`;
    },
    JSXOpeningElement(path, state) {
      const attributes = path.node.attributes;
      const nameNode = path.node.name;
      const baseClass = [];

      if (
        state.file
        && state.file.opts
        && state.file.opts.basename
      ) {
        baseClass.push(state.file.opts.basename);
      }

      if (t.isJSXIdentifier(nameNode)) {
        baseClass.push(nameNode.name);
      }


      if (!disableClass) {
        const classNode = attributes.find(attr =>
          attr.name && attr.name.name === classPrefix
        );

        if (classNode) {
          const classExpr = classNode.value.expression;

          if (classExpr) {
            let attrValue;

            if (classExpr.object && classExpr.object.name === jssClassPrefix) {
              attrValue = classExpr.property.name || classExpr.property.value;

            } else if (classExpr.arguments) {
              const values = classExpr.arguments.map(_transpile);
              attrValue = values.join('-');
            }

            if (attrValue) {
              baseClass.push(attrValue);
            }
          }
        }
      }

      const newAttributes = t.jSXAttribute(
        t.jSXIdentifier(nodeNameAttr),
        t.stringLiteral(baseClass.join('_'))
      );

      attributes.push(newAttributes);
    },
  };

  return { visitor };

  function _transpile(data) {
    if (t.isObjectExpression(data)) {
      return _transpileObject(data);

    } else if (
      t.isMemberExpression(data) &&
      data.object.name === jssClassPrefix
    ) {
      return data.property.name || data.property.value;

    } else if (t.isArrayExpression(data)) {
      return _transpileArray(data);
    }
  }

  function _transpileObject(obj) {
    const values = obj.properties.map(prop => {
      if (
        t.isMemberExpression(prop.key) &&
        prop.key.object.name === jssClassPrefix
      ) {
        return prop.key.property.name || prop.key.property.value;
      } else {
        return prop.key.name;
      }
    });

    return values.join('-');
  }

  function _transpileArray(arr) {
    const values = arr.elements.map(el => {
      if (
        t.isMemberExpression(el) &&
        el.object.name === jssClassPrefix
      ) {
        return el.property.name || el.property.value;
      } else {
        return el.value;
      }
    });

    return values.join('-');
  }
}
