import * as path from "path";
import * as webpack from "webpack";
const config: webpack.Configuration = {
    entry : {
        index: "./src/index.ts",
    },
    externals: {
        preact: "commonjs preact",
        skatejs: "commonjs skatejs",
    },
    module: {
        rules: [
            {
                enforce: "pre",
                loader: "tslint-loader",
                test: /\.ts$/,
            },{
                loader: "awesome-typescript-loader",
                test: /\.(ts|tsx)$/,
            },
        ],
    },
    node: {
    process: false,
    },
output: {
    filename: "[name].js",
    librarytarget: "commonjs-module",
    path: path.resolve(__dirname, "lib"),
}, resolve: {
    extensions: [".tsx", ".ts", ".js"],
},
target: "web",
};

export default config;
