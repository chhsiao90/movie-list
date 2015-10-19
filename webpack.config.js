var path = require("path");

module.exports = {
    entry: "./app/index.js",
    output: {
        path: __dirname,
        publicPath: "/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel"
            },
            {
                test: /\.css$/,
                loader: "style!css" 
            }
        ]
    }
};
