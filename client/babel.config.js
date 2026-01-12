module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-class-properties',
    '@babel/plugin-transform-class-static-block',
    '@babel/plugin-bugfix-firefox-class-in-computed-class-key',
  ],
};

