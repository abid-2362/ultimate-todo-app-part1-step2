// const learning = require('pg');
import * as pg from 'pg';
class DBConnection {
  private dbHost: string = 'localhost';
  private dbName: string = 'node_todo';
  private dbUser: string = 'postgres';
  private dbPass: string = 'admin';
  private dbPort: number = 5432;

  // constructor(dbHost, dbName, dbUser, dbPass) {
  //   this.dbHost = dbHost;
  //   this.dbName = dbName;
  //   this.dbUser = dbUser;
  //   this.dbPass = dbPass;
  // }

  public connect() {
    const client = new pg.Client({
      user: this.dbUser,
      host: this.dbHost,
      database: this.dbName,
      password: this.dbPass,
      port: this.dbPort,
    });
    client.connect();
    return client;
  }
}

export default DBConnection;
