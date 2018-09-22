import { Request, Response } from "express";
const pg = require("pg");
const uuid = require("uuid");

export default class TodoController {
  public createNewTask(req: Request, res: Response) {
    const client = new pg.Client("postgres://localhost/todo");
    client.connect();
    const task = req.body;
    (async function hit() {
      try {
        const response = await client.query(
          `INSERT INTO todo_info(id,title,discription,done)
          VALUES($1,$2,$3,$4)`,
          [uuid(), task.title, task.discription]
        );
        client.end();
        const resSend = response.rowCount
          ? { message: "New Todo added", status: true }
          : { message: "Can't add new Todo", status: false };
        res.status(200).send([resSend]);
      } catch (err) {
        res
          .status(500)
          .send([{ message: "Can't add new Todo", status: false }, err]);
      }
    })();
  }

  public getAllTasks(req: Request, res: Response) {
    console.log("hello getalltask");
    const client = new pg.Client("postgres://localhost/todo");
    client.connect();
    (async function hit() {
      try {
        const response = await client.query("SELECT * FROM todo_info");
        client.end();
        res.status(200).send(response.rows);
        console.log("inside try block");
      } catch (err) {
        res
          .status(500)
          .send([{ message: "Server Not Found Error!", status: false }, err]);
        console.log("inside catch block");
      }
    })();
  }

  public getTaskById(req: Request, res: Response) {
    const client = new pg.Client("postgres://localhost/todo");
    client.connect();
    const { id } = req.params;
    (async function hit() {
      try {
        const response = await client.query(
          "SELECT * FROM todo_info WHERE ID = $1",
          [id]
        );
        client.end();
        res.status(200).send(response.rows);
      } catch (err) {
        res
          .status(500)
          .send([{ message: "Server Error!", status: false }, err]);
      }
    })();
  }

  public deleteTask(req: Request, res: Response) {
    const client = new pg.Client("postgres://localhost/todo");
    client.connect();
    const { id } = req.params;
    (async function hit() {
      try {
        const response = await client.query(
          `DELETE FROM todo_info WHERE ID = $1`,
          [id]
        );
        client.end();
        const resSend = response.rowCount
          ? { message: "Todo deleted successfully", status: true }
          : { message: "Unable deleted a todo", status: false };
        res.status(200).send([resSend]);
      } catch (err) {
        res
          .status(500)
          .send([{ message: "Unable to delete", status: false }, err]);
      }
    })();
  }

  public updateTask(req: Request, res: Response) {
    const client = new pg.Client("postgres://localhost/todo");
    client.connect();
    const { done } = req.body;
    const { id } = req.params;
    (async function hit() {
      try {
        const response = await client.query(
          `UPDATE todo_info 
        SET DONE = $1
        WHERE ID = $2`,
          [done, id]
        );
        client.end();
        const resSend = response.rowCount
          ? done
            ? { message: "Todo added to done list successfully", status: true }
            : {
                message: "Todo added to undone list successfully",
                status: true
              }
          : { message: "Unable update a todo", status: false };
        res.status(200).send([resSend]);
      } catch (err) {
        res
          .status(500)
          .send([{ message: "Unable to update", status: false }, err]);
      }
    })();
  }
}
