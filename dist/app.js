"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var bodyParser = require("body-parser");
var Todo_routes_1 = require("./Routes/Todo.routes");
var App = /** @class */ (function () {
    function App() {
        this.app = Express();
        this.router = new Todo_routes_1.default();
        this.configureApp();
    }
    App.prototype.configureApp = function () {
        // use middlewares here
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(function (req, res, next) {
            // allows cors options from all origins
            res.header("Access-Control-Allow-Origin", "*");
            // not required here but will allow session related information in login type of applications
            res.header("Access-Control-Allow-Credentials", "true");
            // allow request methods
            res.header("Access-Control-Allow-Methods", "DELETE,PUT,GET,POST");
            // allow content-type headers
            res.header("Access-Control-Allow-Headers", "Content-Type");
            next();
        });
        // Initialize Router
        this.router.routes(this.app);
    };
    return App;
}());
exports.default = new App().app;
