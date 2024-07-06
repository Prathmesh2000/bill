// next.config.js

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    // console.log('Original webpack config:', config); // Debugging line

    // Aliasing Node.js core modules
    config.resolve.alias = {
      ...config.resolve.alias,
      'child_process': 'empty',
      'fs': 'empty',
      'net': 'empty',
      'tls': 'empty',
      'dns': 'empty',
    };

    return config;
  },
};
