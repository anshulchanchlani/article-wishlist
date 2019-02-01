const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path')
module.exports = {
    entry: ['./src/client/index.js'],
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/public/',
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
        }
        ]
    },
    plugins:[
        new CompressionPlugin({
            include:'/\/pubilc/'
        })
    ],
    //Minimization and Caching and other performance enabling options are enabled by default in Webpack 4. No need to set them to true.
    optimization:{
        minimizer:[new UglifyJsPlugin({
            parallel:true,
            cache:true,
            
        })],
        splitChunks: {
            chunks: 'all',
            name:'vendors',
           
        },
        
    }
};