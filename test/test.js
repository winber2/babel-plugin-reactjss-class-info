import path from 'path';
import babel from 'babel-core';
import pluginTester from 'babel-plugin-tester';
import plugin from '../src/index.js';

pluginTester({
  plugin: plugin,
  pluginName: 'reactjss-class-info',
  fixtures: path.join(__dirname, 'fixtures'),
  babelOptions: {
    babelrc: true
  }
});
