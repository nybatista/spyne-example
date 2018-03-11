module.exports = env => {

    const path = require("path");
    const webpack = require('webpack');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const WebpackCdnPlugin = require('webpack-cdn-plugin');

    const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

    const SitePath = String(path.resolve(__dirname, 'dist')).toLowerCase();
    const ExtractTextPlugin = require("extract-text-webpack-plugin");
    const extractSass = new ExtractTextPlugin("./dist/static/css/main.css");
    const htmlPlugin = new HtmlWebpackPlugin({
        title: 'spynejs-example',
        template: './src/index.html.ejs'
    });

    const allPlugins = [htmlPlugin,extractSass];

    if (env === "production"){
        //const uglifier = new UglifyJsPlugin({minimize: true});
        allPlugins.push(new UglifyJsPlugin());
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
        entry: "./src/app/index.js",

        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: outputPublicPath,
            filename: 'static/js/index.js'
        },

        devServer: {
            contentBase: path.join(__dirname, "src"),
            port: 8080
        },

        devtool: 'inline-source-map',

        module: {
            rules: [

                {
                    test: /\.js$/,
                    exclude: /(node_modules)/
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
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    })
                }

            ]
        },
        resolve: {
            extensions: ['.js']
        },
        externals: {
          "R": "ramda",
          "Rx": "rxjs"

        },

        plugins: allPlugins

    };
};



