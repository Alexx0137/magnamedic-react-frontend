const path = require('path');

module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            return {
                ...webpackConfig,
                resolve: {
                    ...webpackConfig.resolve,
                    fallback: {
                        "http": require.resolve("stream-http"),
                        "https": require.resolve("https-browserify"),
                        "util": require.resolve("util/"),
                        "zlib": require.resolve("browserify-zlib"),
                        "stream": require.resolve("stream-browserify"),
                        "assert": require.resolve("assert/"),
                        "url": require.resolve("url/")
                    }
                }
            };
        }
    }
};
