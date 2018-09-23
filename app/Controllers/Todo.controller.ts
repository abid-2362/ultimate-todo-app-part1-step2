import { Request, Response } from "express";
const pg = require("pg");
const uuid = require("uuid");
import DBConnect from "../dbConnection";
export default class TodoController {
  public createNewTask(req: Request, res: Response) {
    let client = new DBConnect().connect();
    const task = req.body;
    let id: number;
    if (req.body.id) {
      id = req.body.id;
    } else {
      id = null;
    }
    (async function hit() {
      let response: any;
      try {
        if (id) {
          response = await client.query(
            `INSERT INTO todo_info(id,title,discription,done)
            VALUES($1,$2,$3,$4)`,
            [id,task.title, task.description, task.done]
          );
        } else {
          response = await client.query(
            `INSERT INTO todo_info(title,discription,done)
            VALUES($1,$2,$3)`,
            [task.title, task.description, task.done]
          );
        }
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
    let client = new DBConnect().connect();
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
      }
    })();
  }

  public getTaskById(req: Request, res: Response) {
    let client = new DBConnect().connect();
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
    let client = new DBConnect().connect();
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
          : {
              message:
                "Unable deleted a todo, it might already have been deleted",
              status: false
            };
        res.status(200).send([resSend]);
      } catch (err) {
        res.status(500).send([
          {
            message:
              "Unable deleted a todo, it might already have been deleted",
            status: false
          },
          err
        ]);
      }
    })();
  }

  public updateTask(req: Request, res: Response) {
    let client = new DBConnect().connect();
    const { title, description, done } = req.body;
    const { id } = req.params;
    (async function hit() {
      try {
        const response = await client.query(
          `UPDATE todo_info
            SET (title, discription, done) = ($1, $2, $3)
            WHERE id = $4`,
          [title, description, done, id]
        );
        client.end();
        const resSend = response.rowCount
          ? { message: "Todo updated successfully", status: true }
          : { message: "Unable update a todo", status: false };
        res.status(200).send([resSend]);
      } catch (err) {
        res
          .status(500)
          .send([{ message: "Unable to update", status: false }, err.message]);
      }
    })();
  }
}
