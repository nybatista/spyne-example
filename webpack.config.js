module.exports = env => {

    const path = require("path");
    const webpack = require('webpack');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const PACKAGE = require('./package.json');
    const ExtractTextPlugin = require("extract-text-webpack-plugin");
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    const ip = require('ip');
    let localIpAddress = ip.address();

    let devToolsVal = 'inline-source-map';



    const extractSass = new ExtractTextPlugin({
        filename: "static/css/main.css",
        disable: process.env.NODE_ENV === "development"
    });

    const htmlPlugin = new HtmlWebpackPlugin({
        title: 'spynejs-example test',
        template: './src/index.html.ejs'
    });



    const allPlugins = [htmlPlugin,extractSass];


    if (env === "build"){
        allPlugins.push(new BundleAnalyzerPlugin());
        devToolsVal = '';
    }


    const staticPathPrefix =  "../../" ;
    const outputPublicPath =  '' ;
    const PATHS = {
        dist: path.resolve(__dirname, 'dist'),
        src: path.resolve(__dirname, 'src'),
        static: path.resolve(__dirname, 'dist/static'),
        css: path.resolve(__dirname, 'dist/static/css')
    };

    return {

        entry: {

            index: "./src/app/index.js"
        },


        output: {
            path: PATHS.dist,
            publicPath: outputPublicPath,
            filename: 'static/js/[name].js'
        },

        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all'
                    }
                }
            }
        },


        devServer: {
            contentBase: PATHS.src,
            host: localIpAddress,
            port: 8080
        },

        devtool: devToolsVal,

        module: {
            rules: [{
                    test: /(\.js)$/,
                    loader: 'babel-loader',
                    options: {
                        "babelrc" : false,
                        "presets": [
                            ["@babel/preset-env", {
                                "targets": {
                                    "ie" : 10,
                                    "browsers": ["last 2 versions"]
                                },
                                "modules": false,
                                "loose": true
                            }]
                        ]
                    },

/*
                    exclude: /(node_modules)/
*/

                },

                {
                    test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.ttf$|\.wav$|\.mp3$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            publicPath:  staticPathPrefix,
                            useRelativePath: false,
                            context: "dist/",
                            name: '[path][name].[ext]',
                        }
                    }
                },

               {
                    test: /\.woff$|\.ttf$|\.wav$|\.mp3$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            publicPath:  staticPathPrefix,
                            context: "dist/",
                            name: "[path][name].[ext]",
                        }
                    }
                },

                {
                    test: /\html$/,
                    loader: 'html-loader'

                },

                {
                    test: /\.css$/,
                    use: [
                        {loader: 'style-loader'},
                        {loader: 'css-loader'}
                    ]
                },

                {
                    test: /\.scss$/,
                    use: extractSass.extract({
                        use: [{
                            loader: "css-loader"
                        }, {
                            loader: "sass-loader"
                        }],
                        // use style-loader in development
                        fallback: "style-loader"
                    })
                }

            ]
        },
        resolve: {
            extensions: ['.js']
        },

        externals: {
          Rx: 'rxjs',
            R: 'ramda'
        },

        plugins: allPlugins

    };
};



