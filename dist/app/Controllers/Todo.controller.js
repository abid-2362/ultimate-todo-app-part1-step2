"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg = require("pg");
var uuid = require("uuid");
var TodoController = /** @class */ (function () {
    function TodoController() {
    }
    TodoController.prototype.createNewTask = function (req, res) {
        var client = new pg.Client("postgres://localhost/todo");
        client.connect();
        var task = req.body;
        (function hit() {
            return __awaiter(this, void 0, void 0, function () {
                var response, resSend, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, client.query("INSERT INTO todo_info(id,title,discription,done)\n          VALUES($1,$2,$3,$4)", [uuid(), task.title, task.discription])];
                        case 1:
                            response = _a.sent();
                            client.end();
                            resSend = response.rowCount
                                ? { message: "New Todo added", status: true }
                                : { message: "Can't add new Todo", status: false };
                            res.status(200).send([resSend]);
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _a.sent();
                            res
                                .status(500)
                                .send([{ message: "Can't add new Todo", status: false }, err_1]);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        })();
    };
    TodoController.prototype.getAllTasks = function (req, res) {
        console.log("hello getalltask");
        var client = new pg.Client("postgres://localhost/todo");
        client.connect();
        (function hit() {
            return __awaiter(this, void 0, void 0, function () {
                var response, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, client.query("SELECT * FROM todo_info")];
                        case 1:
                            response = _a.sent();
                            client.end();
                            res.status(200).send(response.rows);
                            console.log("inside try block");
                            return [3 /*break*/, 3];
                        case 2:
                            err_2 = _a.sent();
                            res
                                .status(500)
                                .send([{ message: "Server Not Found Error!", status: false }, err_2]);
                            console.log("inside catch block");
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        })();
    };
    TodoController.prototype.getTaskById = function (req, res) {
        var client = new pg.Client("postgres://localhost/todo");
        client.connect();
        var id = req.params.id;
        (function hit() {
            return __awaiter(this, void 0, void 0, function () {
                var response, err_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, client.query("SELECT * FROM todo_info WHERE ID = $1", [id])];
                        case 1:
                            response = _a.sent();
                            client.end();
                            res.status(200).send(response.rows);
                            return [3 /*break*/, 3];
                        case 2:
                            err_3 = _a.sent();
                            res
                                .status(500)
                                .send([{ message: "Server Error!", status: false }, err_3]);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        })();
    };
    TodoController.prototype.deleteTask = function (req, res) {
        var client = new pg.Client("postgres://localhost/todo");
        client.connect();
        var id = req.params.id;
        (function hit() {
            return __awaiter(this, void 0, void 0, function () {
                var response, resSend, err_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, client.query("DELETE FROM todo_info WHERE ID = $1", [id])];
                        case 1:
                            response = _a.sent();
                            client.end();
                            resSend = response.rowCount
                                ? { message: "Todo deleted successfully", status: true }
                                : { message: "Unable deleted a todo", status: false };
                            res.status(200).send([resSend]);
                            return [3 /*break*/, 3];
                        case 2:
                            err_4 = _a.sent();
                            res
                                .status(500)
                                .send([{ message: "Unable to delete", status: false }, err_4]);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        })();
    };
    TodoController.prototype.updateTask = function (req, res) {
        var client = new pg.Client("postgres://localhost/todo");
        client.connect();
        var done = req.body.done;
        var id = req.params.id;
        (function hit() {
            return __awaiter(this, void 0, void 0, function () {
                var response, resSend, err_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, client.query("UPDATE todo_info \n        SET DONE = $1\n        WHERE ID = $2", [done, id])];
                        case 1:
                            response = _a.sent();
                            client.end();
                            resSend = response.rowCount
                                ? done
                                    ? { message: "Todo added to done list successfully", status: true }
                                    : {
                                        message: "Todo added to undone list successfully",
                                        status: true
                                    }
                                : { message: "Unable update a todo", status: false };
                            res.status(200).send([resSend]);
                            return [3 /*break*/, 3];
                        case 2:
                            err_5 = _a.sent();
                            res
                                .status(500)
                                .send([{ message: "Unable to update", status: false }, err_5]);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        })();
    };
    return TodoController;
}());
exports.default = TodoController;
//# sourceMappingURL=Todo.controller.js.map