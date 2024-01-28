import os from "os";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
import webpack from "webpack";

const getLocalExternalIP = () => [].concat(...Object.values(os.networkInterfaces()))
    .filter(details => (details.family === "IPv4" || details.family === 4) && !details.internal)
    .pop()?.address;

const devConfig = () => {
    const addr = getLocalExternalIP() || "0.0.0.0";
    return {

        entry: {main: ["./src/index.js", "./src/css/style.css"]},
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [{
                        loader: MiniCssExtractPlugin.loader
                    }, "css-loader"],
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                minify: false,
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css"
            }),
            new webpack.DefinePlugin({
                __USE_SERVICE_WORKERS__: false
            }),
            new CopyPlugin({
                patterns: [
                    { from: "./src/images", to: "./images" },
                    { from: "./data", to: "./data" },
                    { from: "./src/manifest.json", to: "./" }
                ],
            })
        ],
        devServer: {
            compress: true,
            port: 8080,
            hot: true,
            open: true,
            host: addr
        }
    };
};

export default devConfig;
