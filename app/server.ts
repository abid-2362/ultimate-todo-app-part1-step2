import app from "./app";
import serverConfig from "./serverConfig";

const pg = require("pg");

const client = new pg.Client("postgres://localhost/todo");

// const seed = () => {
//   const qry = `DROP TABLE IF EXISTS todo_info;
//   CREATE TABLE todo_info {
//     id smallint,
//     title text    ,
//     discription text,
//     done boolean
//   }`;

//   client.query(qry, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//   });
// };

// const connect = () => {
//   client.connect(err => {
//     if (!err) {
//       if (seed) {
//         seed();
//         console.log("seed some data");
//       }
//     }
//   });
// };

// connect();

const server = app.listen(serverConfig.port, () => {
  console.log("server is running at " + serverConfig.port);
});

module.exports = server;
