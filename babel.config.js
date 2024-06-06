module.exports = {
  ignore: [/(node_module)/],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: '>1%, not ie 11, not op_mini all' // https://jamie.build/last-2-versions
      }
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic'
      }
    ]
  ],
  plugins: [
    [
      '@emotion',
      {
        autoLabel: 'always'
      }
    ],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining'
  ],
  env: {
    test: {
      plugins: [
        'require-context-hook',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining'
      ]
    },
    production: {
      plugins: [['transform-react-remove-prop-types', { removeImport: true }]]
    }
  }
};
