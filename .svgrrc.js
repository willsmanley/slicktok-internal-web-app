// See: https://github.com/gregberge/svgr/issues/473#issuecomment-739082637

// Note: sometimes this config causes SVGs to be encoded incorrectly into TypeScript
// components. If that happens (usually when the SVG seems to be not rendering), then
// just manually convert the SVG children into valid JSX and paste them into the TS
// component. TODO: Improve the SVGR config to appropriately handle all conversions.

module.exports = {
  template: require('./typescript-template'),
  ext: 'tsx',
  prettierConfig: {
    parser: 'typescript',
  },
  jsx: {
    babelConfig: {
      plugins: [
        // I removed these properties to have full control over them
        [
          '@svgr/babel-plugin-remove-jsx-attribute',
          {
            elements: ['path'],
            attributes: ['strokeWidth', 'stroke'],
          },
        ],
      ],
    },
  },
}