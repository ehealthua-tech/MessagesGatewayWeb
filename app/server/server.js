import Express from "express";
import path from "path";
import fs from "fs";
import url from "url";
import cookieParser from "cookie-parser";
import proxy from "proxy-middleware";
import i18nextMiddleware from "i18next-express-middleware";

import page from "./page";
import seo from "./seo";
import auth from "./auth";
import { stripProtocol } from "../common/helpers/url";

import i18next from "../common/services/i18next";
import * as config from "../common/config";

const server = new Express();

server.set("port", config.PORT);

server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");

const resources = {
  js: ["/static/env.js"],
  css: []
};

// NOTE: file is not exist while webpack compile. so we can't use require
const assets = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../static/webpack-assets.json"),
    "utf8"
  )
);

Object.keys(assets).forEach(key => {
  if (assets[key].js) resources.js.push(assets[key].js);
  if (assets[key].css) resources.css.push(assets[key].css);
});

server.locals.resources = resources;

server.locals.CONFIG = escape(JSON.stringify(config));

server.use(cookieParser());
server.use(i18nextMiddleware.handle(i18next));

let cookieOptions = url.parse(config.API_HOST);
cookieOptions.cookieRewrite = "." + stripProtocol(config.API_HOST);
server.use(config.API_PROXY_PATH, proxy(cookieOptions));
server.enable("trust proxy");

cookieOptions = url.parse(config.MOCK_API_HOST);
cookieOptions.cookieRewrite = "." + stripProtocol(config.API_HOST);
server.use(config.MOCK_API_PROXY_PATH, proxy(cookieOptions));

server.use(Express.static(path.join(__dirname, "../../public")));
server.use("/static", Express.static(path.join(__dirname, "../../static")));
server.use(
  "/fonts",
  Express.static(path.join(__dirname, "../../assets/fonts"))
);
server.get("/api/not-found", (req, res) => res.status(404).send()); // for test

server.use(seo);
server.use(auth);

server.get("*", page());

server.use((req, res, err) => {
  console.log(err.stack,'err.stack');
  // TODO report error here or do some further handlings
  res.status(500).send("something went wrong...");
});

server.listen(server.get("port"), err => {
  if (err) {
    console.log(err,'err');
    return;
  }

  console.log(`Listening at http://localhost: ${server.get("port")}`);
});
