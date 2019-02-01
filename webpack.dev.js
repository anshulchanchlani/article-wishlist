
module.exports = {
    entry: ['./src/client/index.js'],
    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: '[name].js'
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.scss$/,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ]
        },
        { loader: 'file-loader', test: /\.(ttf|eot|svg)$/ }

        ]
    },
    optimization:{
        splitChunks: {
            // include all types of chunks
            chunks: 'all',
            name:'vendors'
        }
    },
    devServer: { contentBase: './public' }
};