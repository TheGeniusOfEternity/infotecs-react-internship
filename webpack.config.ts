import path from "path";
import webpack from "webpack";
import type { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import "webpack-dev-server";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: Configuration = {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "less-loader",
            options: { lessOptions: { javascriptEnabled: true } },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      "process.env.API_ENDPOINT": JSON.stringify(process.env.API_ENDPOINT),
      "process.env.ADMIN_LOGIN": JSON.stringify(process.env.ADMIN_LOGIN),
      "process.env.ADMIN_PASSWORD": JSON.stringify(process.env.ADMIN_PASSWORD),
    }),
  ],
  devServer: {
    open: true,
    port: 3000,
    historyApiFallback: true,
  },
  devtool: "source-map",
};

export default config;
