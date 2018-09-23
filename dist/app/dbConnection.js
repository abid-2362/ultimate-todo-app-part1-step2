"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const learning = require('pg');
var pg = require("pg");
var DBConnection = /** @class */ (function () {
    function DBConnection() {
        this.dbHost = 'localhost';
        this.dbName = 'node_todo';
        this.dbUser = 'postgres';
        this.dbPass = 'admin';
        this.dbPort = 5432;
    }
    // constructor(dbHost, dbName, dbUser, dbPass) {
    //   this.dbHost = dbHost;
    //   this.dbName = dbName;
    //   this.dbUser = dbUser;
    //   this.dbPass = dbPass;
    // }
    DBConnection.prototype.connect = function () {
        console.log(pg);
        var client = new pg.Client({
            user: this.dbUser,
            host: this.dbHost,
            database: this.dbName,
            password: this.dbPass,
            port: this.dbPort,
        });
        client.connect();
        return client;
    };
    return DBConnection;
}());
exports.default = DBConnection;
//# sourceMappingURL=dbConnection.js.map