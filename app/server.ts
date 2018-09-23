import app from "./app";
import serverConfig from "./serverConfig";
import DBConnect from './dbConnection';

// let db = new DBConnect('localhost', 'node_todo', 'root', '');
// let db = new DBConnect();
// let client = db.connect();
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
