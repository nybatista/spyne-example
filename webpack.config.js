module.exports = env => {

    const path = require("path");
    const webpack = require('webpack');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const WebpackCdnPlugin = require('webpack-cdn-plugin');
    const PACKAGE = require('./package.json');
    const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

    const SitePath = String(path.resolve(__dirname, 'dist')).toLowerCase();
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

    let ubuObj = {
        UBU : JSON.stringify("THE UBU VAL"),
        VERSION: JSON.stringify(PACKAGE.version)
    };

    const definePlugin = new webpack.DefinePlugin(ubuObj);
    console.log("ADRESS: ",localIpAddress,ubuObj,PACKAGE);
    const envPlugin =  new webpack.EnvironmentPlugin({
        NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
        DEBUG: false
    });;
    const allPlugins = [htmlPlugin,extractSass,definePlugin];


    if (env === "build"){

        //const uglifier = new UglifyJsPlugin({minimize: true});
        //  allPlugins.push(new UglifyJsPlugin());
        // allPlugins.push( new BundleAnalyzerPlugin());
        //https://creativeholder.com/dist/spyne/spyne.min.js
        allPlugins.push(new BundleAnalyzerPlugin());
        devToolsVal = '';
    }




    if (env === "production"){
        //const uglifier = new UglifyJsPlugin({minimize: true});
      //  allPlugins.push(new UglifyJsPlugin());
       // allPlugins.push( new BundleAnalyzerPlugin());
        //https://creativeholder.com/dist/spyne/spyne.min.js



       /* allPlugins.push(
            new WebpackCdnPlugin({
                prod: true,
                prodUrl: '//creativeholder.com/dist/spyne/spyne.min.js',
                modules: [

                    {
                        name: 'spyne',
                        var: 'spyne',
                        prodUrl: "//spynejs.org/dist/spyne.min.js"
                    }
                ]
            })

        );


        allPlugins.push(
            new WebpackCdnPlugin({
                prod: true,
                prodUrl: '//cdnjs.cloudflare.com/ajax/libs/:name/:version/:path',
                modules: [

                    {
                        name: 'rxjs',
                        var: 'Rx',
                        version: '5.5.6',
                        path: 'Rx.min.js',
                        prodUrl: '//cdnjs.cloudflare.com/ajax/libs/:name/:version/:path'

                    },
                    {
                        name: 'ramda',
                        var: 'R',
                        version: '0.25.0',
                        path: 'ramda.min.js',
                        prodUrl: '//cdnjs.cloudflare.com/ajax/libs/:name/:version/:path'

                    }
                ]
            })

        );

*/


    }

    //const staticPathPrefix = env === "development" ? "../../" : "//creativeholder.com/pipsisland/wysiwyg-wip/";
    //const outputPublicPath = env === "development" ? '' : './';
    const staticPathPrefix =  "../../" ;
    const outputPublicPath =  '' ;
   // console.log("ENVIROMENT IS --> ", env,  staticPathPrefix, 'outputPath ',outputPublicPath);
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



       /* entry:{

            index: "./src/app/index.js",
            vendor: ['rxjs','ramda','spyne','gsap']



        },*/

        output: {
            path: path.resolve(__dirname, 'dist'),
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
            contentBase: path.join(__dirname, "src"),

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

/*
                            publicPath: "http://creativeholder.com/pipsisland/wysiwyg-wip/",
*/
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



