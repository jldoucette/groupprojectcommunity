var path = require('path');

module.exports = {

    //define entry point
    entry: path.resolve(__dirname) + "/javascripts/main.js",
    //define output point
    output: {
        path: path.resolve(__dirname, 'dist') + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    //define how webpack tranforms the files
    module: {
        loaders: [
            {
                test: /\.js$/, //test particular files, files with .js extensions
                include: path.resolve(__dirname, 'public'),
                exclude: /(node_modules)/, //excludes the node_modules folder
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
}