/**
 *  覆盖
 */
'use strict';

const path = require('path');

const validateBoolOption = (name, value, defaultValue) => {
  if (typeof value === 'undefined') {
    value = defaultValue;
  }

  if (typeof value !== 'boolean') {
    throw new Error(`Preset react-app: '${name}' option must be a boolean.`);
  }

  return value;
};

module.exports = function(api, opts, env) {
  if (!opts) {
    opts = {};
  }

  var isEnvDevelopment = env === 'development';
  var isEnvProduction = env === 'production';
  var isEnvTest = env === 'test';

  var useESModules = validateBoolOption(
    'useESModules',
    opts.useESModules,
    isEnvDevelopment || isEnvProduction
  );
  var isFlowEnabled = validateBoolOption('flow', opts.flow, true);
  var isTypeScriptEnabled = validateBoolOption(
    'typescript',
    opts.typescript,
    true
  );
  var areHelpersEnabled = validateBoolOption('helpers', opts.helpers, true);
  var useAbsoluteRuntime = validateBoolOption(
    'absoluteRuntime',
    opts.absoluteRuntime,
    true
  );

  var absoluteRuntimePath = undefined;
  if (useAbsoluteRuntime) {
    absoluteRuntimePath = path.dirname(
      require.resolve('@babel/runtime/package.json')
    );
  }

  if (!isEnvDevelopment && !isEnvProduction && !isEnvTest) {
    throw new Error(
      'Using `babel-preset-react-app` requires that you specify `NODE_ENV` or ' +
        '`BABEL_ENV` environment variables. Valid values are "development", ' +
        '"test", and "production". Instead, received: ' +
        JSON.stringify(env) +
        '.'
    );
  }

  return {
    presets: [
      isEnvTest && [
        // ES features necessary for user's Node version
        require('@babel/preset-env').default,
        {
          targets: {
            node: 'current',
          },
        },
      ],
      (isEnvProduction || isEnvDevelopment) && [
        // Latest stable ECMAScript features
        require('@babel/preset-env').default,
        {
          // Allow importing core-js in entrypoint and use browserlist to select polyfills
          useBuiltIns: 'entry',
          // Set the corejs version we are using to avoid warnings in console
          // This will need to change once we upgrade to corejs@3
          corejs: 3,
          // Do not transform modules to CJS
          modules: false,
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol'],
        },
      ],
      [
        require('@babel/preset-react').default,
        {
          // Adds component stack to warning messages
          // Adds __self attribute to JSX which React will use for some warnings
          development: isEnvDevelopment || isEnvTest,
          // Will use the native built-in instead of trying to polyfill
          // behavior for any plugins that require one.
          useBuiltIns: true,
        },
      ],
      isTypeScriptEnabled && [require('@babel/preset-typescript').default],
    ].filter(Boolean),
    plugins: [
      isFlowEnabled && [
        require('@babel/plugin-transform-flow-strip-types').default,
        false,
      ],
      require('babel-plugin-macros'),
      [
        require('@babel/plugin-transform-destructuring').default,
        {
          loose: false,
          selectiveLoose: [
            'useState',
            'useEffect',
            'useContext',
            'useReducer',
            'useCallback',
            'useMemo',
            'useRef',
            'useImperativeHandle',
            'useLayoutEffect',
            'useDebugValue',
          ],
        },
      ],
      // Turn on legacy decorators for TypeScript files
      isTypeScriptEnabled && [
        require('@babel/plugin-proposal-decorators').default,
        false,
      ],
      [
        require('@babel/plugin-proposal-class-properties').default,
        {
          loose: true,
        },
      ],
      [
        require('@babel/plugin-proposal-object-rest-spread').default,
        {
          useBuiltIns: true,
        },
      ],
      [
        require('@babel/plugin-transform-runtime').default,
        {
          corejs: false,
          helpers: areHelpersEnabled,
          regenerator: true,
          useESModules,
          absoluteRuntime: absoluteRuntimePath,
        },
      ],
      isEnvProduction && [
        // Remove PropTypes from production build
        require('babel-plugin-transform-react-remove-prop-types').default,
        {
          removeImport: true,
        },
      ],
      // Adds syntax support for import()
      require('@babel/plugin-syntax-dynamic-import').default,
      isEnvTest &&
        // Transform dynamic import to require
        require('babel-plugin-dynamic-import-node'),
    ].filter(Boolean),
    overrides: [
      isFlowEnabled && {
        exclude: /\.tsx?$/,
        plugins: [require('@babel/plugin-transform-flow-strip-types').default],
      },
      isTypeScriptEnabled && {
        test: /\.(tsx)|(js)|(jsx)?$/,
        plugins: [
          [
            require('@babel/plugin-proposal-decorators').default,
            { legacy: true },
          ],
        ],
      },
    ].filter(Boolean),
  };
};
