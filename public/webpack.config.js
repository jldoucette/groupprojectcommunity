module.exports = {

    //define entry point
    entry: "./javascripts/test1.js",
    //define output point
    output: {
        path: "dist",
        filename: "bundle.js"
    },
    //define how webpack tranforms the files
    module: {
        loaders: [
            {
                test: /\.js$/, //test particular files, files with .js extensions
                exclude: /(node_modules)/, //excludes the node_modules folder
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
}